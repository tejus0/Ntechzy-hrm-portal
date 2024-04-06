export const getOrders = async () => {
    return await fetch("http://localhost:7000/api/getallleave").then((res) => res.json());
  };
  
  export const  getRevenue = async () => {
    return await fetch("http://localhost:7000/api/getLeavesReport").then((res) => res.json());
  };
  
  export const getSales = async () => {
    return await  fetch("http://localhost:7000/api/getallSales").then((res) => res.json());
  };
  
  export const getSalesReport = async () => {
    return await fetch("http://localhost:7000/api/getSalesReport").then((res) => res.json());
  };

  export const getTasksReport = async () => {
    return await fetch("http://localhost:7000/api/getTasksReport").then((res) => res.json());
  };