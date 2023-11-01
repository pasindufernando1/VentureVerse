import React,{useState,useEffect, useRef} from "react";
import { Button, Header, AreaChart } from "../webcomponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import useAuth from "../../hooks/useAuth";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable' ;

const UserReports = () => {
    const { get } = useAxiosMethods();
    const [response, setResponse] = useState([]);
    const {auth} = useAuth();
    const chartref=useRef(null);

    const id = auth.id;

    useEffect(() => {
        get(`/investors/InvestedAmount/${id}`,setResponse);
    }, []);

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
  
    const months = [];
    for (let i = 12; i > 0; i--) {
      const year = currentYear + Math.floor((currentMonth + i) / 12)-1;
      const monthIndex = (currentMonth + i) % 12;
      const monthName = new Date(currentYear, monthIndex).toLocaleString('default', { month: 'short' });
      months.push(`${monthName} ${year}`);
    }

    //reverse the array
    months.reverse();

    const totalAmount = [];
    months.forEach(element => {
        let amount = 0;
        response.forEach(investment => {
            if(investment.finalizeDate === element){
                investment.amount = parseInt(investment.amount);
                amount = amount + investment.amount;
            }
        });
        totalAmount.push(amount);
    });


    const areaChart = {
        chart1: {
            series: [
                {
                    name: "Invested Amount", 
                    data: totalAmount, 
                    color: "#FFC542"
                }
            ],
            categories: months,
        }
    }

    const handleGeneratePDF = async () => {
        const reportName = "Investments Report";
        const description = `This report shows your investments in each month for the last 12 months.\n\nDate: ${new Date().toLocaleString()}\n`;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfContainer = chartref.current;

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(25);
        pdf.setTextColor(144,16,185);
        const textWidth = pdf.getStringUnitWidth(reportName) * pdf.getFontSize() / pdf.internal.scaleFactor;
        const textOffset = (pdf.internal.pageSize.width - textWidth) / 2;
        pdf.text(reportName, textOffset, 20);

        //description with styles
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);
        pdf.text(description, 20, 40);

        //chart with styles
        const canvas = await html2canvas(pdfContainer);
        const imageData = canvas.toDataURL('image/png');
        pdf.addImage(imageData, 'PNG', 20, 60, 170, 100);

        const tableHeaders = ["Month", "Invested Amount(LKR)"];
        const tableData = [];
        for(let i=0;i<months.length;i++){
            totalAmount[i] = parseInt(totalAmount[i]);
            tableData.push([months[i],totalAmount[i]]);
        }

        const tableOptions = {
            head: [tableHeaders],
            body: tableData,
            startY: 160,
            margin: { left: 10 }, // Adjust left margin for desired horizontal position
            theme: 'grid',
            styles: {
              fontSize: 10,
              cellPadding: 1,
              overflow: 'linebreak',
              halign: 'center',
              valign: 'middle',
            },
            columnStyles: {
              0: { cellWidth: 30 },
              1: { cellWidth: 30 },
            },
          };
      
          // Calculate the total table width
          const totalTableWidth = tableHeaders.length * tableOptions.columnStyles[0].cellWidth;
      
          // Calculate the center position for X-axis
          const pageWidth = pdf.internal.pageSize.width;
          const startX = (pageWidth - totalTableWidth) / 2;
      
          // Adjust the left margin to the calculated startX
          tableOptions.margin.left = startX;
      
          pdf.autoTable({
            ...tableOptions,
          });

        pdf.save(`${reportName}.pdf`);

    }

    return(
        <div>
        <Header active="Analytics">  
            <Button
                    variant="clear"
                    className="px-[0.75rem] !border-none"
                    type="button"
                    icon="previous"
                    onClick={() => {
                        window.location.href = "/investor/analytics";
                    }}
                >
                Back
            </Button>     
            <div className="w-full flex flex-col lg:flex-row gap-[1rem] mt-6">
                <div className="w-full bg-white rounded-lg border-[1px] p-4 md:p-6">
                    <div className="flex flex-row gap-[0.2rem] border-gray-200 border-b py-2">
                        <div className="flex flex-row">
                            <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-2">
                                Investments
                            </h5>
                        </div>
                        <div className="flex flex-row">
                            <Button
                                variant="clear"
                                className=" w-[5rem] ml-[45rem] border-none"
                                type="button"
                                onClick={handleGeneratePDF}
                            >
                                Download
                            </Button>
                        </div>   
                    </div>
                    <div ref={chartref}>
                    <div className="flex items-center gap-[1rem]">
                         <div className="flex justify-between items-center">
                            <p className="text-base font-normal text-gray-700 dark:text-gray-400">Invested Amount</p>
                            <div
                                className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                                <FontAwesomeIcon icon={faArrowUp} className="ml-1"/>
                            </div>
                        </div>
                    </div>
                    <AreaChart series={areaChart.chart1.series} categories={areaChart.chart1.categories} colors={areaChart.chart1.colors}/>
                    </div>
                </div>
            </div>    
        </Header>
        </div>   
    )

}

export default UserReports;