import React from "react";
import { selectAllTodos, selectTodoStatus  } from "../state-management/features/salesDataSlice";
import { useAppSelector } from "../state-management/hooks"
import { Irows, Icolumns } from "../types/reactTailwindTable"
import Table from "react-tailwind-table";
import {Spinner } from "../components/Spinner"

const Sales: React.FC = () => {
    const allSalesData = useAppSelector(selectAllTodos);
    const todoStatus = useAppSelector(selectTodoStatus);
    let salesDataColumn:Icolumns = [];
    const salesDataRows:Irows = allSalesData;
    if(allSalesData.length > 0){
        salesDataColumn = [
  
          {
            field: "Customer Name",
            use: "Customer Name",
            use_in_search:true
          },
          {
            field: "Product Name",
            use: "Product Name",
            use_in_search:true
          },
          {
            field: "Country",
            use: "Country",
            use_in_search:true
          },
          {
            field: "Sales",
            use: "Sales",
            use_in_search:true
          },{
            field: "Quantity",
            use: "Quantity",
            use_in_search:true
          },{
            field: "Discount",
            use: "Discount",
            use_in_search:true
          },{
            field: "Profit",
            use: "Profit",
            use_in_search:true
          }
          ,{
            field: "Category",
            use: "Category",
            use_in_search:true
          },{
            field: "Sub-Category",
            use: "Sub-Category",
            use_in_search:true
          },{
            field: "Order Date",
            use: "Order Date",
            use_in_search:true
          },{
            field: "Ship Date",
            use: "Ship Date",
            use_in_search:true
          }

        ]
      }
  

    return (
        <>
            { todoStatus === "pending" && <Spinner />  }
            <div className="grid grid-cols-12 gap-4">

            { allSalesData.length <= 0 ?
               <div className="col-span-12 text-2xl text-red-500">  Please Make a Post Request  </div> :
                <>
                  <div className="col-span-12 text-2xl text-red-500 mt-2">  Sales Data ({ allSalesData.length }) in Total  </div>
                  <div className="col-span-12">
                      { <Table columns={salesDataColumn} rows={salesDataRows} per_page={50} />  }
                  </div>
                </>
            
            }

                

            </div>
        </>
    )
}

export default Sales;