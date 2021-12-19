import { createSlice,  createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { salesDataType }  from "../../types/model"


const allSalesData:salesDataType[] = []; 




 export const salesRecord: salesDataType= {
                                              Category: "", 
                                              City: "",
                                              Country: "",
                                              "Customer ID": "",
                                              "Customer Name": "",
                                              Discount: "",
                                              "Order Date": "",
                                              "Order ID": "",
                                              "Postal Code": "",
                                              "Product ID": "",
                                              "Product Name": "",
                                              Profit: "",
                                              Quantity: "",
                                              Region: "",
                                              "Row ID": "",
                                              Sales: "",
                                              Segment: "",
                                              "Ship Date": "",
                                              "Ship Mode": "",
                                              State: "",
                                              "Sub-Category": ""
                                              }; 
                                      
                                      

const initialState = {
  allSalesData,
  salesRecord,
  status : "idle"
}





export const store = createAsyncThunk('salesData/store', async (values: any, { rejectWithValue }) => {       
  try {
    const storeResponse = await axios.post(`https://g54qw205uk.execute-api.eu-west-1.amazonaws.com/DEV/stub`, values);
  return await storeResponse.data;  
  }catch (err:any){
    return rejectWithValue(err.response.data) 
  }  
})




export const salesDataSlice = createSlice({
    name: 'allSalesData',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(store.pending, (state, action) => {
            state.status = 'pending';
            console.log(action);
          }).addCase(store.fulfilled, (state, action) => {
                      state.status = 'idle'; 
                      state.allSalesData = action.payload;
                      console.log(action);
                }).addCase(store.rejected, (state, action) => {
                  state.status = 'failed';
                  console.log(action);
          })  
      },
})

//export const { } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAllTodos  = (state: RootState) => state.salesDatas.allSalesData; 
export const selectTodoStatus = (state: RootState) => state.salesDatas.status;
export const selectTodoRecord = (state: RootState) => state.salesDatas.salesRecord;  

export default salesDataSlice.reducer;