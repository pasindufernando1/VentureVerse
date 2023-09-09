import React from "react";
import { Button, Header, AreaChart} from "../webcomponent";
import { List, ListItem} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import { useEffect, useState, useRef } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable' ;

const InterestReports = () => {
    const { get } = useAxiosMethods();
    const [response, setResponse] = useState([]);
    const[interests,setInterests] = useState([]);
    const lineChartRef = useRef(null);
    const lineChartRef1 = useRef(null);

    useEffect(() => {
        get("/investors/userInterest",setResponse);
    }, []);

    useEffect(() => {
        get("/investors/interestSectors",setInterests);
    }, []);

    var FoodandBevarages = 0;
    var Technology = 0;
    var AppWebsite = 0;
    var Fitness = 0;
    var HealthWellnessNutrition = 0;
    var Sports = 0;
    var Beauty = 0;
    var ClothingFashion = 0;
    var ToysGames = 0;
    var EntertainmentExperiential = 0;
    var Pets = 0;
    var Music = 0;
    var Holiday = 0;
    var Children = 0;
    var HousewaresHomeDesign = 0;

    interests.forEach(element => {
        //convert amount to number
        element.amount = Number(element.amount);
        if(element.sectorName === "Food and Bevarages"){
            FoodandBevarages=FoodandBevarages+element.amount;
        }else if(element.sectorName === "Technology"){
            Technology=Technology+element.amount;
        }else if(element.sectorName === "App/Website"){
            AppWebsite=AppWebsite+element.amount;
        }else if(element.sectorName === "Fitness"){
            Fitness=Fitness+element.amount;
        }else if(element.sectorName === "Health/Wellness/Nutrition"){
            HealthWellnessNutrition=HealthWellnessNutrition+element.amount;
        }else if(element.sectorName === "Sports"){
            Sports=Sports+element.amount;
        }else if(element.sectorName === "Beauty"){
            Beauty=Beauty+element.amount;
        }else if(element.sectorName === "Clothing/Fashion"){
            ClothingFashion=ClothingFashion+element.amount;
        }else if(element.sectorName === "Toys/Games"){
            ToysGames=ToysGames+element.amount;
        }else if(element.sectorName === "Entertainment / Experiential"){
            EntertainmentExperiential=EntertainmentExperiential+element.amount;
        }else if(element.sectorName === "Pets"){
            Pets=Pets+element.amount;
        }else if(element.sectorName === "Music"){
            Music=Music+element.amount;
        }else if(element.sectorName === "Holiday"){
            Holiday=Holiday+element.amount;
        }else if(element.sectorName === "Children"){
            Children=Children+element.amount;
        }else if(element.sectorName === "Housewares / Home Design"){
            HousewaresHomeDesign=HousewaresHomeDesign+element.amount;
        }
    });

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

    //count the no of interests in each month
    const countInterests = [];
    months.forEach(element => {
        let countInterest = 0;
        response.forEach(interest => {
            if(interest.inerestedDate === element){
                countInterest++;
            }
        });
        countInterests.push(countInterest);       
    });

    const areaChart = {
        chart1: {
            series: [
                {
                    name: "Interests", data: countInterests, 
                    color: "#1a56db"
                }
            ],
            colors: ["#1a56db"],
            categories: months
        },
        chart2: {
            series: [
                {
                    name: "Category Interests", data: [FoodandBevarages,Technology,AppWebsite,Fitness,HealthWellnessNutrition,Sports,Beauty,ClothingFashion,ToysGames,EntertainmentExperiential,Pets,Music,Holiday,Children,HousewaresHomeDesign],
                    color: "#FFD668"
                }
            ],
            categories: ["Food and Bevarages", "Technology", "App/Website","Fitness","Health/Wellness/Nutrition","Sports","Beauty","Clothing/Fashion","Toys/Games","Entertainment / Experiential","Pets","Music","Holiday","Children","Housewares / Home Design"]
        }
    }

    const handleGeneratePDF = async() => {
        const reportName = "Listing Interests Report";
        const description = `This report shows the listing interests post by the investors last 12 months.\n\nDate: ${new Date().toLocaleString()}\n`;
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
        pdf.text(description, 30, 40);

        //chart with styles
        const canvas = await html2canvas(pdfContainer);
        const imageData = canvas.toDataURL('image/png');
        pdf.addImage(imageData, 'PNG', 30, 60, 170, 100);

        const tableHeaders = ["Month","No of Interests"];
        const tableData = [];
        for(let i=0;i<months.length;i++){
            tableData.push([months[i],countInterests[i]]);
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

    const handleGeneratePDF1 = async() => {
        const reportName = "Invesor Interested Sectors Report";
        const description = `This report shows the listing interests of investors according to the industry sectors.\n\nDate: ${new Date().toLocaleString()}\n`;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfContainer = lineChartRef1.current;

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

        const tableHeaders = ["Industry Sector","Invested Amount(Rs)"];
        const tableData = [];
        tableData.push(["Food and Bevarages",FoodandBevarages]);
        tableData.push(["Technology",Technology]);
        tableData.push(["App/Website",AppWebsite]);
        tableData.push(["Fitness",Fitness]);
        tableData.push(["Health/Wellness/Nutrition",HealthWellnessNutrition]);
        tableData.push(["Sports",Sports]);
        tableData.push(["Beauty",Beauty]);
        tableData.push(["Clothing/Fashion",ClothingFashion]);
        tableData.push(["Toys/Games",ToysGames]);
        tableData.push(["Entertainment / Experiential",EntertainmentExperiential]);
        tableData.push(["Pets",Pets]);
        tableData.push(["Music",Music]);
        tableData.push(["Holiday",Holiday]);
        tableData.push(["Children",Children]);
        tableData.push(["Housewares / Home Design",HousewaresHomeDesign]);

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
              0: { cellWidth: 50 },
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
            <div className="flex flex-col gap-[1rem] flex-wrap lg:flex-nowrap">
            <div className="w-full bg-white rounded-lg border-[1px] p-4 md:p-6">
                    <div className="flex flex-row gap-[0.2rem]">
                        <div className="flex flex-row">
                            <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                                Interested Sectors
                            </h5>
                        </div>
                        <div className="flex flex-row">
                            <Button
                                variant="clear"
                                className=" w-[5rem] ml-[37rem] border-none"
                                type="button"
                                onClick={handleGeneratePDF1}
                            >
                                Download
                            </Button>
                        </div>   
                    </div>
                    <div ref={lineChartRef1}>
                    <div className="flex items-center gap-[1rem]">
                         <div className="flex justify-between items-center">
                            <p className="text-base font-normal text-gray-700 dark:text-gray-400">Amount</p>
                            <div
                                className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                                <FontAwesomeIcon icon={faArrowUp} className="ml-1"/>
                            </div>
                        </div>
                    </div>
                    <AreaChart series={areaChart.chart2.series} categories={areaChart.chart2.categories} colors={areaChart.chart2.colors}/>
                    </div>
                </div>
                <div className="w-full bg-white rounded-lg border-[1px] p-4 md:p-6">
                    <div className="flex flex-row gap-[0.2rem]">
                        <div className="flex flex-row">
                            <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                                Listing Interests
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
                            <p className="text-base font-normal text-gray-700 dark:text-gray-400"># Interests</p>
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

export default InterestReports;