import React,{useEffect,useRef,useState} from "react";
import { Button, Header, DoughnutChart,Popover, BarChart } from "../webcomponent";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoneyCheckDollar} from "@fortawesome/free-solid-svg-icons";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable' ;

const GainsReport = () => {
    const { get } = useAxiosMethods();
    const [response, setResponse] = useState([]);
    const barChartRef = useRef(null);

    useEffect(() => {
        get("/entrepreneur/userGains",setResponse);
    }, []);

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
  
    const months = [];
    for (let i = 12; i > 0; i--) {
      const year = currentYear + Math.floor((currentMonth + i) / 12)-1;
      const monthIndex = (currentMonth + i) % 12;
      const monthName = new Date(currentYear, monthIndex).toLocaleString('default', { month: 'long' });
      months.push(`${monthName} ${year}`);
    }

    //reverse the array
    months.reverse();

    //convert all the subscription prices to numbers
    response.forEach(element => {
        element.subscriptionprice = Number(element.subscriptionprice);
    });

    //for each month, calculate the total income
    const totalIncome = [];
    months.forEach(month => {
        let income = 0;
        response.forEach(element => {
            if(element.publishedDate === month){
                income += element.subscriptionprice;
            }
        });
        totalIncome.push(income);
    });

    console.log(totalIncome[10]);

    const barchart={
        chart1:{
            label:"Total Users",
            series:[
            {
                name:"Income",
                data:totalIncome
            }
            ],
            dataLabels: months
        }
    } 

    const handleGeneratePDF = async() => {
        const reportName = "User Gains Report";
        const description = `This report shows the total income gained from the subscriptions of the users for the \n past 12 months.\n\nDate: ${new Date().toLocaleString()}\n`;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfContainer = barChartRef.current;

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
        pdf.text(description, 30, 40);

        //chart with styles
        const canvas = await html2canvas(pdfContainer);
        const imageData = canvas.toDataURL('image/png');
        pdf.addImage(imageData, 'PNG', 30, 60, 170, 100);

        const tableHeaders = ["Month","Income(LKR)"];
        const tableData = [];
        for(let i=0;i<months.length;i++){
            tableData.push([months[i],totalIncome[i]]);
        }

        console.log(tableData);

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
                    window.location.href = "/admin/analytics";
                }}
            >
               Back
            </Button>  
            <div className="w-full flex flex-col lg:flex-row gap-[1rem]">
                <div className="w-full lg:w-full bg-white rounded-lg border-[1px] p-4 md:p-6">
                    <div className="flex flex-row gap-[0.2rem] border-gray-200 border-b py-2">
                        <div className="flex flex-row">
                            <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                                User Gains
                            </h5>
                        </div>
                        <div className="flex flex-row">
                            <Button
                                variant="clear"
                                className=" w-[5rem] ml-[42rem] border-none"
                                type="button"
                                onClick={handleGeneratePDF}
                            >
                                Download
                            </Button>
                        </div>   
                    </div>
                    <div ref={barChartRef}>
                    <div className="flex items-center gap-[1rem]">
                        <div className="flex justify-between items-center">
                            <p className="text-base font-normal text-gray-800 dark:text-gray-400">Income</p>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faMoneyCheckDollar}/>
                        </div>
                    </div>
                    <BarChart data={barchart.chart1}/>
                    </div>
                </div>
            </div>         
        </Header>
        </div>   
    )

}

export default GainsReport;