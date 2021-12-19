import React from "react";
import { selectAllTodos, selectTodoStatus } from "../state-management/features/salesDataSlice";
import { useAppSelector } from "../state-management/hooks";
import {Spinner } from "../components/Spinner";
import { ResponsivePie } from "@nivo/pie";
import { Bar } from "react-chartjs-2";

const Home: React.FC = () => {
    const allSalesData = useAppSelector(selectAllTodos);
    const todoStatus = useAppSelector(selectTodoStatus);
    const renderedData = allSalesData.map(data => (
                                                <div className="col-span-3 shadow-md p-4 m-2 rounded-md" key={data["Order ID"]}>
                                                    { data["Product Name"] }
                                                </div>
                                            ))
    let uniqueCategories:string[] = [];
    const categories = allSalesData.map(data => data.Category);
    categories.forEach((category) => {
      if(!uniqueCategories.includes(category)){
          uniqueCategories.push(category);
      }
    })

    const categoryOfficeSupplies = allSalesData.filter(data => data.Category === "Office Supplies");
    const categoryFurnitures = allSalesData.filter(data => data.Category === "Furniture");
    const categoryTechnology = allSalesData.filter(data => data.Category === "Technology");
    const totalCategory = categoryOfficeSupplies.length + categoryFurnitures.length + categoryTechnology.length;

    const data = [
        {
          id: categoryOfficeSupplies.length > 0 ? categoryOfficeSupplies[0]["Row ID"] : '0',
          label: "Office Supplies",
          value: categoryOfficeSupplies.length > 0 ? categoryOfficeSupplies.length / totalCategory : "0",
          color: "#F47560",
        },
        {
            id: categoryFurnitures.length > 0 ?  categoryFurnitures[0]["Row ID"] : '0',
            label: "Furnitures",
            value: categoryFurnitures.length > 0 ? categoryFurnitures.length / totalCategory : "0",
            color: "#FCD34D",
        },
        {
            id: categoryTechnology.length > 0 ? categoryTechnology[0]["Row ID"] : "0",
            label: "Technology",
            value: categoryTechnology.length > 0 ? categoryTechnology.length / totalCategory : "0",
            color: "#10277C",
        },
      ];

      const barChartData = {
        labels: ["Office Supplies", "Furnitures", "Technology"],
        datasets: [
          {
            label: "No. of Orders By Categories",
            data: [categoryOfficeSupplies.length, categoryFurnitures.length, categoryTechnology.length],
            backgroundColor: [
              "rgba(75, 73, 150, 1)",
              "rgba(42, 139, 242, 1)",
              "rgba(237, 103, 0, 1)",
              "rgba(255, 193, 7, 1)",
            ],
            borderColor: [
              "rgba(75, 73, 150, 1)",
              "rgba(42, 139, 242, 1)",
              "rgba(237, 103, 0, 1)",
              "rgba(255, 193, 7, 1)",
            ],
          },
        ],
      };
    
      const barChartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: ' Bar Chart Sales By Categories',
          },
        },
      };

    return (
        <>
            { todoStatus === "pending" && <Spinner />  }
            <div className="grid grid-cols-12 gap-4 content-center ">

            { allSalesData.length <= 0 ?
               <div className="col-span-12 text-2xl text-red-500">  Please Make a Post Request  </div> : 

             <>
                <div className="col-span-12 text-2xl text-red-500">  Sales Data Dashboard  </div>
                <div className="col-span-6 shadow-lg bg-gray-100 rounded-lg border-2">
                    <h3 className="text-center text-xl">Sales By Category</h3>
                <div className="h-96">
                    <ResponsivePie
                    data={data}
                    colors={["#F47560", "#EAB308", "#10277C"]}
                    valueFormat=">-.0%"
                    margin={{ top: 30, right: 80, bottom: 120, left: 80 }}
                    innerRadius={0.5}
                    padAngle={1.5}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: "color" }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{ from: "color", modifiers: [["brighter", 10]] }}
                    legends={[
                        {
                        anchor: "bottom",
                        direction: "column",
                        translateX: -105,
                        translateY: 110,
                        itemsSpacing: 4,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemTextColor: "#000",
                        itemDirection: "left-to-right",
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: "circle",
                        },
                    ]}
                    />
                </div>
                </div>

                <div className="col-span-6 shadow-lg bg-gray-100 rounded-lg border-2">
                <div className="h-96">
                
                <Bar data={barChartData} options={barChartOptions }  />

                </div>
                </div>
                </>

               }
                


            </div>
        </>
    )
}

export default Home;