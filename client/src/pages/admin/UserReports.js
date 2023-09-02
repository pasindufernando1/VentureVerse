import React,{useState,useEffect, useRef} from "react";
import { Button, Header, DoughnutChart,Popover, BarChart} from "../webcomponent";
import { List, ListItem} from "@material-tailwind/react";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable' ;

const UserReports = () => {
    const { get } = useAxiosMethods();
    const [response, setResponse] = useState([]);
    const[response1,setResponse1]=useState([]);
    const[response2,setResponse2]=useState([]);
    const barchartref = useRef(null);
    const PieChart1 = useRef(null);
    const PieChart2 = useRef(null);

    useEffect(() => {
        get("/user/getusers",setResponse);
    }, []);

    useEffect(() => {
        get("/user/getuserregistration",setResponse2);
    }, []);

    useEffect(() => {
        get("/user/getusersignup",setResponse1);
    }, []);

    const approvedUsers = [];
    const pendingUsers = [];

    response.forEach(user => {
        const userStatus = user.approvalStatus;
        const userRole = user.userRole;
        if(userStatus === "APPROVED"){
            approvedUsers.push(userRole);
        }else if(userStatus === "PENDING"){
            pendingUsers.push(userRole);
        }
    });

    let approvedInvestors = 0;
    let approvedEntrepreneurs = 0;
    let approvedCoAdmins = 0;

    let pendingInvestors = 0;
    let pendingEntrepreneurs = 0;
    let pendingCoAdmins = 0;

    approvedUsers.forEach(element => {
        if (element === "INDIVIDUAL_INVESTOR"||element === "ENTERPRISE_INVESTOR") {
            approvedInvestors++;
        } else if (element === "ENTREPRENEUR") {
            approvedEntrepreneurs++;
        } else if (element === "CO_ADMIN") {
            approvedCoAdmins++;
        }
    });

    let acceptedusers = 0;
    let pendingusers = 0;
    let rejectedusers = 0;

    response2.forEach(user => {
        const userStatus = user.status;
        if(userStatus === "APPROVED"){
            acceptedusers++;
        }else if(userStatus === "PENDING"){
            pendingusers++;
        }else if(userStatus === "DELETED"){
            rejectedusers++;
        }
    });

    //barchart data
    const Investors = [];
    const Entrepreneurs = [];
    const CoAdmins = [];

    response1.forEach(user => {
        const userRole = user.userRole;
        const userMonth = user.registeredMonth;
        if(userRole === "INDIVIDUAL_INVESTOR"||userRole === "ENTERPRISE_INVESTOR"){
            Investors.push(userMonth);
        }else if(userRole === "ENTREPRENEUR"){
            Entrepreneurs.push(userMonth);
        }else if(userRole === "CO_ADMIN"){
            CoAdmins.push(userMonth);
        }
    });

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

    //count the no of users in each month
    const countInvestors = [];
    const countEntrepreneurs = [];
    const countCoAdmins = [];

    months.forEach(month => {
        let countInvestor = 0;
        let countEntrepreneur = 0;
        let countCoAdmin = 0;
        Investors.forEach(element => {
            if(element === month){
                countInvestor++;
            }
        });
        Entrepreneurs.forEach(element => {
            if(element === month){
                countEntrepreneur++;
            }
        });
        CoAdmins.forEach(element => {
            if(element === month){
                countCoAdmin++;
            }
        });
        countInvestors.push(countInvestor);
        countEntrepreneurs.push(countEntrepreneur);
        countCoAdmins.push(countCoAdmin);
    });

    const donutChart = {
        chart1: {
            label: "Total Users",
            series: [approvedInvestors, approvedEntrepreneurs, approvedCoAdmins],
            colors: ["#E186DD", "#FFD668", "#FF969C"],
            dataLabels: ["Investors", "Entrepreneur","Co-Admins"]
        },
        chart2:{
            label: "Total Users",
            series: [acceptedusers, pendingusers, rejectedusers],
            dataLabels: ["Accepted","Pending","Rejected"]
        }
    } 
     // bar chart to diplay no of users with the month
    const barchart={
        chart1:{
            label:"Total Users",
            series:[{
                name:"Investors",
                data:countInvestors
            },
            {
                name:"Entrepreneur",
                data:countEntrepreneurs
            },
            {
                name:"Co-Admins",
                data:countCoAdmins
            }
            ],
            colors:["#00CED9", "#1AE3B5", "#9CF28B"],
            dataLabels:months
        }
    } 

    const handleGeneratePDF = async () => {
        const reportName = "User Signup Report";
        const description = `This is a report of the user signups for the last 12 months.\n\nDate: ${new Date().toLocaleString()}\n`;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfContainer = barchartref.current;

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
         pdf.addImage(imageData, 'PNG', 30, 60, 170, 100); // Adjust position and dimensions

        //get the table data from the table
        const tableData = [];
        const tableHeaders = [];
        const table = pdfContainer.querySelector('table');
        const tableHeader = table.querySelector('thead');
        const tableBody = table.querySelector('tbody');
        const tableHeaderCells = tableHeader.querySelectorAll('th');
        const tableBodyRows = tableBody.querySelectorAll('tr');
        tableHeaderCells.forEach((tableHeaderCell) => {
            tableHeaders.push(tableHeaderCell.textContent.trim());
        });
        tableBodyRows.forEach((tableBodyRow) => {
            const tableRowData = [];
            const tableBodyRowCells = tableBodyRow.querySelectorAll('td');
            tableBodyRowCells.forEach((tableBodyRowCell) => {
                tableRowData.push(tableBodyRowCell.textContent.trim());
            });
            tableData.push(tableRowData);
        });

        //add the table to the pdf
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
              3: { cellWidth: 30 },
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
         // Save the PDF
         pdf.save('UserSignupReport.pdf');
    }

    const handleGeneratePDF1 = async () => {
        const reportName = "Registered Users Report";
        const description = `This is a report of the registered users for the last 12 months.\n\nDate: ${new Date().toLocaleString()}\n`;
        const tablestat=`Investors: ${approvedInvestors}\nEntrepreneurs: ${approvedEntrepreneurs}\nCo-Admins: ${approvedCoAdmins}\n`;

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfContainer = PieChart1.current;
        
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

            //create a 2 column table for the data
            const tableHeaders = ["UserRole","No.of Users"];
            const tableData = [
                ["Investors",approvedInvestors],
                ["Entrepreneurs",approvedEntrepreneurs],
                ["Co-Admins",approvedCoAdmins]
            ];

            const tableOptions = {
                head: [tableHeaders],
                body: tableData,
                startY: 60,
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
          
            const canvas = await html2canvas(pdfContainer);
            const imageData = canvas.toDataURL('image/png');
            pdf.addImage(imageData, 'PNG', 50, 100, 120, 100); // Adjust position and dimensions
            
            // Save the PDF
            pdf.save('registeredusers.pdf');
        }
    }

    const handleGeneratePDF2 = async () => {
        const reportName = "Registration Requests Report";
        const description = `This is a report of the registration requests for the last 12 months.\n\nDate: ${new Date().toLocaleString()}\n`;
        
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfContainer = PieChart2.current;

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

            //create a 2 column table for the data
            const tableHeaders = ["Status","No.of Users"];
            const tableData = [
                ["Accepted",acceptedusers],
                ["Pending",pendingusers],
                ["Rejected",rejectedusers]
            ];
            const tableOptions = {
                head: [tableHeaders],
                body: tableData,
                startY: 60,
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

            const canvas = await html2canvas(pdfContainer);
            const imageData = canvas.toDataURL('image/png');
            pdf.addImage(imageData, 'PNG', 50, 100, 120, 100); // Adjust position and dimensions
            
            // Save the PDF
            pdf.save('userrequests.pdf');

        }
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
                <div className="w-full bg-white rounded-lg border-[1px] p-4 md:p-6">
                    <div className="flex flex-row gap-[0.2rem] border-gray-200 border-b py-2">
                        <div className="flex flex-row">
                            <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                                User Signups
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
                    <div ref={barchartref}>
                    <div className="flex flex-col gap-[0.2rem] py-2">
                        <div className="flex items-center gap-[1rem]">
                            <div className="flex justify-between items-center">
                                <p className="text-base font-normal text-gray-700 dark:text-gray-400"># Users</p>
                                <div
                                    className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                                    <FontAwesomeIcon icon={faArrowUp} className="ml-1"/>
                                </div>
                            </div>
                        </div>
                    </div>
                        <BarChart data={barchart.chart1}/>
                        <table style={{ display: 'none' }}>
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Month</th>
                                    <th className="px-4 py-2"># Investors</th>
                                    <th className="px-4 py-2"># Entrepreneurs</th>
                                    <th className="px-4 py-2"># Co-Admins</th>
                                </tr>
                            </thead>
                            <tbody>
                                {months.map((month, index) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2">{month}</td>
                                        <td className="border px-4 py-2">{countInvestors[index]}</td>
                                        <td className="border px-4 py-2">{countEntrepreneurs[index]}</td>
                                        <td className="border px-4 py-2">{countCoAdmins[index]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>    
                </div>
            </div>    
            <div className="w-full flex flex-col lg:flex-row gap-[1rem] mt-6">
                <div className="w-full lg:w-[50%] bg-white rounded-lg border-[1px] p-4 md:p-6">
                    <div className="flex flex-row gap-[0.2rem] border-gray-200 border-b py-2">
                        <div className="flex flex-row">
                            <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-2">
                                Registered Users
                            </h5>
                        </div>
                        <div className="flex flex-row">
                            <Button
                                variant="clear"
                                className=" w-[5rem] ml-[9rem] border-none"
                                type="button"
                                onClick={handleGeneratePDF1}
                            >
                                Download
                            </Button>
                        </div>
                    </div>
                    <div ref={PieChart1}>
                    <DoughnutChart data={donutChart.chart1}/>
                    </div>
                    <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
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
                                User Requests
                            </h5>
                        </div>
                        <div className="flex flex-row">
                            <Button
                                variant="clear"
                                className=" w-[5rem] ml-[11rem] border-none"
                                type="button"
                                onClick={handleGeneratePDF2}
                            >
                                Download
                            </Button>
                        </div>
                    </div>
                    <div ref={PieChart2}>
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