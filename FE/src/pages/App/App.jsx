import { useRoutes, BrowserRouter } from "react-router-dom";
import { ShoppingCartProvider } from "../../context";
import {
  HomePage,
  NotFound,
  MyOrders,
  DetailProduct,
  CartShoppingPage,
  OrderPage,
  LastOrderPage,
  Signin,
} from "../";
import { NavBar, Footer, CheckoutSideMenu } from "../../components";
import "./App.css";
import User from "../Dashboard/User";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import API from "../../config/axios";
import { useForm } from "react-hook-form";

// export const App = () => {
//   let { data: { data } = { data: [] } } = useQuery({
//     queryKey: ["get-phieu"],
//     queryFn: async () => {
//       return API.get("/phieu");
//     },
//   });

//   const {mutate, data: productData} = useMutation({
//     mutationKey: ["s"],
//     mutationFn: async (data) => {
//         return API.post(`/phieu?date=${data}`)
//     }
//   })

//   const {register, handleSubmit} = useForm({})

//   data = productData?.data || data

//   return (
//     <div className="container mx-auto mt-10">
   
//             <div className="mb-3 md:w-96">
//                 <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//                     <input
                     
//                         type="date"
//                         {...register("search")}
//                         className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
//                         placeholder="Search"
//                         aria-label="Search"
//                         aria-describedby="button-addon1" />
//                 </div>
//                 <button onClick={handleSubmit(data => {
//                     mutate(new Date(data.search).toLocaleDateString('en-US', {
//                         year: 'numeric',
//                         month: '2-digit',
//                         day: '2-digit'
//                       }))
//                 })}>
//                     search
//                 </button>
//             </div>
//       <ul className="grid gap-y-10">
//         {data?.map((item) => {
//           const date = new Date(item.Ngay);
//           return (
//             <li key={item} className="bg-white shadow-md p-10 rounded-md">
//               <div className="flex flex-col items-center">
//                 <h1 className="text-2xl font-bold mb-4">PHIẾU XUẤT KHO</h1>
//                 <div className="flex flex-row justify-between w-full">
//                   <div className="flex flex-col">
//                     <p>Đơn vị: {item.DonVi}</p>
//                     <p>Bộ phận: {item.BoPhan}</p>
//                   </div>
//                   <div className="flex flex-col">
//                     <p>No. {item.No}</p>
//                     <p>
//                       Ngày {date.getDate()} tháng {date.getMonth() + 1} năm{" "}
//                       {date.getFullYear()}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex flex-col">
//                   <p>Nguoi Nhan hang: {item.NguoiNhanHang}</p>
//                   <p>DiaChi: {item.DiaChi} </p>
//                   <p>Ly do: {item.LyDo} </p>
//                   <p>XuatTaiKho: {item.XuatTaiKho} </p>
//                 </div>

//                 <table className="min-w-full text-left text-sm font-light">
//                   <thead className="border-b font-medium dark:border-neutral-500">
//                     <tr>
//                       <th scope="col" className="px-6 py-4">
//                         stt
//                       </th>
//                       <th scope="col" className="px-6 py-4">
//                         ten
//                       </th>
//                       <th scope="col" className="px-6 py-4">
//                         maso
//                       </th>
//                       <th scope="col" className="px-6 py-4">
//                         don vi tinh
//                       </th>
//                       <th scope="col" className="px-6 py-4">
//                         yeu cau
//                       </th>
//                       <th scope="col" className="px-6 py-4">
//                         thuc xuat
//                       </th>
//                       <th scope="col" className="px-6 py-4">
//                         don gia
//                       </th>
//                       <th scope="col" className="px-6 py-4">
//                         thanh tien
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {item.MatHang.map(hang => {
//                         return (
//                             <tr key={hang} className="border-b dark:border-neutral-500">
//                                 <td className="whitespace-nowrap px-6 py-4 font-medium">
//                                   {hang.ST}
//                                 </td>
//                                 <td className="whitespace-nowrap px-6 py-4">{hang.TenHang}</td>
//                                 <td className="whitespace-nowrap px-6 py-4">{hang.MaSo}</td>
//                                 <td className="whitespace-nowrap px-6 py-4">{hang.DonViTinh}</td>
//                                 <td className="whitespace-nowrap px-6 py-4">{hang.YeuCau}</td>
//                                 <td className="whitespace-nowrap px-6 py-4">{hang.ThucXuat}</td>
//                                 <td className="whitespace-nowrap px-6 py-4">{hang.DonGia}</td>
//                                 <td className="whitespace-nowrap px-6 py-4">{hang.ThanhTien}</td>
//                             </tr>
//                         )
//                     })}
                    
//                   </tbody>
//                 </table>

//                 <div className="mt-4">
//                     <p>Tổng số tiền (viết bằng chữ): {item.TongSoTien}</p>
//                     <p>TSố chứng từ gốc kèm theo: {item.SoChungTu}</p>
//                 </div>

//                 <div className="grid grid-cols-4 gap-x-6 mt-10">
//                     <p className="text-center"><strong className="block">Người lập phiếu</strong> {item.NguoiLapPhieu}</p>
//                     <p className="text-center"><strong className="block">Người nhận hàng</strong> {item.NguoiNhanHang}</p>
//                     <p className="text-center"><strong className="block">Thủ kho</strong> {item.ThuKho}</p>
//                     <p className="text-center"><strong className="block">Kế toán trưởng</strong> {item.KeToanTruong}</p>
//                 </div>
//               </div>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };
const AppRoutes = () => {
    let routes = useRoutes([
        { path: '/', element: <HomePage /> },
        { path: '/laptops', element: <HomePage /> },
        { path: '/tablets', element: <HomePage /> },
        { path: '/cameras', element: <HomePage /> },
        { path: '/headphones', element: <HomePage /> },
        { path: '/cellphones', element: <HomePage /> },
        { path: '/accessories', element: <HomePage /> },
        // { path: '/account', element: <Account /> },
        { path: '/cart-shopping', element: <CartShoppingPage /> },
        { path: '/my-orders/last', element: <LastOrderPage /> },
        { path: '/my-orders/:id', element: <OrderPage /> },
        { path: '/dashboard' , children: [
            {
                path: "", index: true, element: <MyOrders />
            },
            { path: "user", element: <User /> },
        ]},
        { path: '/sign-in', element: <Signin /> },
        { path: '/*', element: <NotFound /> },
        { path: '/product/:id', element: <DetailProduct /> }
    ]);

    return routes;
}

export const App = () => {
    return (
        <ShoppingCartProvider>
            <BrowserRouter>
                <AppRoutes />
                <NavBar />
                <Footer />
                <CheckoutSideMenu />
            </BrowserRouter>
        </ShoppingCartProvider>
    )
};
