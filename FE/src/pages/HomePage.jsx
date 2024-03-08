import { useContext, useEffect } from "react";
import { Card, Layout, ProductDetail } from "../components";
import { Context } from "../context";
import { GoToTop } from "../utils";
import { useDebounce } from 'use-debounce';
import { useQuery, useMutation} from "@tanstack/react-query";
import { getProducts, searchProduct } from "../apis";
import { products } from "../assets/products";
import {useForm} from "react-hook-form"

export const HomePage = () => {
  GoToTop();
//   const { data } = useQuery({
//     queryKey: "get-products",
//     queryFn: getProducts,
//     refetchOnWindowFocus: false
//   });

  const {mutate, data: productFilterData } = useMutation({
    mutationKey: "search",
    mutationFn: (data) => searchProduct(data)
  })



  const renderView = () => {
    const productImages = products.map((product) => product.images);
    const finalData = (productFilterData?.data  || []).map((product) => ({
      ...product,
      category: products[Math.floor(Math.random() * productImages.length)].category,
      images: productImages[Math.floor(Math.random() * productImages.length)],
    }));

    return finalData.map((item) => {
      return <Card key={item.id} item={item} />;
    });
  };

  const {register,  watch} = useForm({
    defaultValues: {
        text: ""
    }
  })

//   const onSubmit = (data) => {
//     mutate(data.text)
//   }

  const [value] = useDebounce(watch("text"), 1000);

  useEffect(() => {
    mutate(value)
  }, [value])


  console.log(productFilterData)

  // const [items, setItems] = useState(null);
  // useEffect(() => {
  //     fetch('https://api.escuelajs.co/api/v1/products')
  //         .then(resp => resp.json())
  //         .then(data => setItems(data))
  // }, []);

  return (
    <Layout>
      <h1 className="mb-5 font-bold text-4xl">Shopi</h1>

      <form  className="w-1/2 mb-8 relative">
        <input
          type="text"
          placeholder="Search product..."
          className="border-2 rounded-lg w-full p-3"
          {...register("text")}
        />
        {/* <button type="submit" className=" absolute top-1/2 right-5 -translate-y-1/2 text-gray-600">Search</button> */}
      </form>

      <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
        {renderView()}
      </div>
      <ProductDetail />
    </Layout>
  );
};
