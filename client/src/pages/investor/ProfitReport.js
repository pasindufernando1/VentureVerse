import React,{useEffect,useState,useRef} from "react";
import { Button, Header, LineChart} from "../webcomponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import useAuth from "../../hooks/useAuth";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable' ;

const InterestReports = () => {
    const { get } = useAxiosMethods();
    const [response, setResponse] = useState([]);
    const {auth} = useAuth();
    const id = auth.id;
    const lineChartRef = useRef(null);

    useEffect(() => {
        get(`/investors/projects/${id}`,setResponse);
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

    const countOngoing = [];
    const countFinalized = [];
    months.forEach(element => {
        let countFinalizedProjects = 0;
        let countOngoingProjects = 0;
        response.forEach(project => {
            if(project.finalizeDate === element){
                countFinalizedProjects++;
            }
        });
        countOngoing.push(countOngoingProjects);
        countFinalized.push(countFinalizedProjects);
    });

    const ongoing = [];
    response.forEach(project => {
        if(project.finalizeDate == "Not Finalized"){
            ongoing.push(project);
        }
    });

    ongoing.forEach(project => {
        const date = project.interestedDate;
        for(let i=0;i<months.length;i++){
            if(date === months[i]){
                for(let j=i;j<months.length;j++){
                    countOngoing[j]++;
                }
                break;
            }
        }
    });

    const lineChart = {
        chart1: {
            series: [
                {
                    name: "Ongoing projects", data: countOngoing, 
                },
                {
                    name:"Finalized Projects", data: countFinalized,
                }

            ],
            colors: ["#1a56db"],
            categories: months
        }
    }

    const handleGeneratePDF = async () => {
        const reportName = "Project Timeline Report";
        const description = `This report shows the number of projects that are ongoing and finalized in the last 12 months.\n\nDate: ${new Date().toLocaleString()}\n`;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfContainer = lineChartRef.current;

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

        const tableHeaders = ["Month","#Ongoing Projects","#Finalized Projects"];
        const tableData = [];
        for(let i=0;i<months.length;i++){
            tableData.push([months[i],countOngoing[i],countFinalized[i]]);
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
              2: { cellWidth: 30 },
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
        <div className="flex flex-col gap-[1rem] flex-wrap lg:flex-nowrap">
                <div className="w-full bg-white rounded-lg border-[1px] p-4 md:p-6">
                    <div className="flex flex-row gap-[0.2rem]">
                        <div className="flex flex-row">
                            <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                               Project Timeline
                            </h5>
                        </div>
                        <div className="flex flex-row">
                            <Button
                                variant="clear"
                                className=" w-[5rem] ml-[38rem] border-none"
                                type="button"
                                onClick={handleGeneratePDF}
                            >
                                Download
                            </Button>
                        </div>
                    </div>
                    <div ref={lineChartRef}>
                    <div className="flex items-center gap-[1rem]">
                         <div className="flex justify-between items-center">
                            <p className="text-base font-normal text-gray-500 dark:text-gray-400"># Views</p>
                            <div
                                className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                                12%
                                <FontAwesomeIcon icon={faArrowUp} className="ml-1"/>
                            </div>
                        </div>
                    </div>
                    <LineChart series={lineChart.chart1.series} categories={lineChart.chart1.categories} colors={lineChart.chart1.colors}/>
                    </div>
                </div>
            </div>
        </Header>
        </div>   
    )

}

export default InterestReports;