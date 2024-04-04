export const getOrders = () => {
    return fetch("http://localhost:7000/api/getallleave").then((res) => res.json());
  };
  
  export const getRevenue = () => {
    return fetch("http://localhost:7000/api/getLeavesReport").then((res) => res.json());
  };
  
  export const getSales = () => {
    return fetch("http://localhost:7000/api/getallSales").then((res) => res.json());
  };
  
  export const getSalesReport = () => {
    return fetch("http://localhost:7000/api/getSalesReport").then((res) => res.json());
  };
  export const getComments = () => {
    return fetch("https://dummyjson.com/comments").then((res) => res.json());
  };