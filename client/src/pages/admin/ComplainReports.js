import React,{useState,useEffect, useRef} from "react";
import { Button, Header, DoughnutChart,Popover, BarChart} from "../webcomponent";
import { List, ListItem} from "@material-tailwind/react";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const UserReports = () => {
    const { get } = useAxiosMethods();
    const [response, setResponse] = useState([]);
    const pdfContainerRef = useRef(null);
    const pdfContainer2Ref = useRef(null);

    useEffect(() => {
        get("/entrepreneurs/getcomplains",setResponse);
    }, []);

    const investorComplains = [];
    const entrepreneurComplains = [];

    response.forEach(complain => {
        const userRole = complain.userRole;
        const complainType = complain.complainType;

        if (userRole === "INDIVIDUAL_INVESTOR") {
            investorComplains.push(complainType);
        } else if (userRole === "ENTREPRENEUR") {
            entrepreneurComplains.push(complainType);
        }
    });

    let acceptedInvestorComplains = 0;
    let pendingInvestorComplains = 0;
    let rejectedInvestorComplains = 0;

    let acceptedEntrepreneurComplains = 0;
    let pendingEntrepreneurComplains = 0;
    let rejectedEntrepreneurComplains = 0;

    //foreach complain count accepted, pending, rejected
    investorComplains.forEach(element => {
        if (element === "ACCEPTED") {
            acceptedInvestorComplains++;
        } else if (element === "PENDING") {
            pendingInvestorComplains++;
        } else if (element === "REJECTED") {
            rejectedInvestorComplains++;
        }
    });

    entrepreneurComplains.forEach(element => {
        if (element === "ACCEPTED") {
            acceptedEntrepreneurComplains++;
        } else if (element === "PENDING") {
            pendingEntrepreneurComplains++;
        } else if (element === "REJECTED") {
            rejectedEntrepreneurComplains++;
        }
    });

    const donutChart = {
        chart1: {
            label: "Total Complains",
            series: [acceptedEntrepreneurComplains, pendingEntrepreneurComplains, rejectedEntrepreneurComplains],
            colors: ["#E186DD", "#FFD668", "#FF969C"],
            dataLabels: ["Accepted","Pending","Rejected"]
        },
        chart2:{
            label: "Total Complains",
            series: [acceptedInvestorComplains, pendingInvestorComplains, rejectedInvestorComplains],
            // colors: ["#A35EC2", "#C7A3D4", "#FFE8FF"],
            dataLabels: ["Accepted","Pending","Rejected"]
        }
    } 

    
    // const tablestat= `Accepted Complains: ${acceptedEntrepreneurComplains}\nPending Complains  : ${pendingEntrepreneurComplains}\nRejected Complains : ${rejectedEntrepreneurComplains}\n`;

    const generatePDF = async () => {
        //report for entrepreneur section
        const reportName = "Entrepreneur Complains Report";
        const description = `This is a report of the complains published by the entrepreneurs
of the system.\n\nDate: ${new Date().toLocaleString()}\n`;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfContainer = pdfContainerRef.current;
    
        if (pdfContainer) {
          //report name with styles
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

            const tableHeaders = ["Complain Type", "No of Complains"];
            const tableData = [
                ["Accepted", acceptedEntrepreneurComplains],
                ["Pending", pendingEntrepreneurComplains],
                ["Rejected", rejectedEntrepreneurComplains]
            ];

            const tableOptions = {
                head: [tableHeaders],
                body: tableData,
                startY: 70,
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
                  1: { cellWidth: 30 }
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

            //chart with styles
            const canvas = await html2canvas(pdfContainer);
            const imageData = canvas.toDataURL('image/png');
            pdf.addImage(imageData, 'PNG', 50, 100, 120, 100); // Adjust position and dimensions
           
            // Save the PDF
            pdf.save('entrepreneur_complains_report.pdf');
        }
    };

    
    const generatePDF2 = async () => {
        //report for investor section
        const reportName2 = "Investor Complains Report";
        //create a multiline description for the pdf including the date,response data
        const description2 = `This is a report of the complains published by the investors
of the system.\n\nDate: ${new Date().toLocaleString()}\n`;

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfContainer = pdfContainer2Ref.current;
    
        if (pdfContainer) {
          //report name with styles
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(25);
            pdf.setTextColor(144,16,185);
            const textWidth = pdf.getStringUnitWidth(reportName2) * pdf.getFontSize() / pdf.internal.scaleFactor;
            const textOffset = (pdf.internal.pageSize.width - textWidth) / 2;
            pdf.text(reportName2, textOffset, 20);

            //description with styles
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(12);
            pdf.setTextColor(0, 0, 0);
            pdf.text(description2, 30, 40);

            const tableHeaders=[ "Complain Type", "No of Complains"];
            const tableData = [
                ["Accepted", acceptedInvestorComplains],
                ["Pending", pendingInvestorComplains],
                ["Rejected", rejectedInvestorComplains]
            ];

            const tableOptions = {
                head: [tableHeaders],
                body: tableData,
                startY: 70,
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
                  1: { cellWidth: 30 }
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


            //chart with styles
            const canvas = await html2canvas(pdfContainer);
            const imageData = canvas.toDataURL('image/png');
            pdf.addImage(imageData, 'PNG', 50, 100, 120, 100); // Adjust position and dimensions
           
            // Save the PDF
            pdf.save('investor_complains_report.pdf');
        }
    };

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
            <div className="w-full flex flex-col lg:flex-row gap-[1rem] mt-6">
                <div className="w-full lg:w-[50%] bg-white rounded-lg border-[1px] p-4 md:p-6">
                    <div className="flex flex-row gap-[0.2rem] border-gray-200 border-b py-2">
                        <div className="flex flex-row">
                            <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-2">
                                Entrepreneur Complains
                            </h5>
                        </div>
                        <div className="flex flex-row">
                            <Button
                                variant="clear"
                                className=" w-[5rem] ml-[3rem] border-none"
                                type="button"
                                onClick={generatePDF}
                            >
                                Download
                            </Button>
                        </div>
                    </div>
                    <div ref={pdfContainerRef}>
                        <div className="chart1ref">
                            <DoughnutChart data={donutChart.chart1}/>
                        </div>
                    </div>
                    <div
                        className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
                        <div className="flex justify-between items-center pt-5 w-full lg:w-[20rem]">
                            <Popover handler="All">
                                <List className="p-0">
                                    <ListItem>
                                        All
                                    </ListItem>
                                    <ListItem>
                                        Last 7 Days
                                    </ListItem>
                                    <ListItem>
                                        Last Month
                                    </ListItem>
                                </List>
                            </Popover>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-[50%] bg-white rounded-lg border-[1px] p-4 md:p-6">
                    <div className="flex flex-row gap-[0.2rem] border-gray-200 border-b py-2">
                        <div className="flex flex-row">
                            <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-2">
                                Investor Complains
                            </h5>
                        </div>
                        <div className="flex flex-row">
                            <Button
                                variant="clear"
                                className=" w-[6rem] ml-[6rem] border-none"
                                type="button"
                                onClick={generatePDF2}
                            >
                                Download
                            </Button>
                        </div>
                    </div>
                    <div ref={pdfContainer2Ref}>
                        <DoughnutChart data={donutChart.chart2}/>
                    </div>
                    <div
                        className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
                        <div className="flex justify-between items-center pt-5 w-full lg:w-[20rem]">
                            <Popover handler="All">
                                <List className="p-0">
                                    <ListItem>
                                        All
                                    </ListItem>
                                    <ListItem>
                                        Last 7 Days
                                    </ListItem>
                                    <ListItem>
                                        Last Month
                                    </ListItem>
                                </List>
                            </Popover>
                        </div>
                    </div>
                </div>
            </div>       
        </Header>
        </div>   
    )

}

export default UserReports;