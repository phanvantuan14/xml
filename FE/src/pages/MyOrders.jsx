import {  useEffect } from "react";
import { Card, Layout } from "../components";
import { Link } from "react-router-dom";
import { GoToTop } from "../utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { delProduct, getProducts, newProduct, updateProduct } from "../apis";
import { toast } from "react-toastify";
import { products } from "../assets/products";

export const MyOrders = () => {
  const { mutate } = useMutation({
    mutationFn: newProduct,
    mutationKey: ["new-product"],
    onSuccess: (data) => {
      toast.success(data.data.message);
      reset();
      refetch();
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  const { mutate: mutateUpdate } = useMutation({
    mutationFn: updateProduct,
    mutationKey: ["update-product"],
    onSuccess: (data) => {
      toast.success(data.data.message);
      reset();
      refetch();
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  const { data: productsData, refetch } = useQuery({
    queryKey: ["get-products"],
    queryFn: getProducts,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, defaultValues },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      des: "",
      price: "",
      quantity: 0,
      totalCartQuantity: 0,
    },
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: delProduct,
    mutationKey: ["del-product"],
  });

  GoToTop();

  useEffect(() => {
    Object.keys(errors || {}).forEach((k) => {
      toast.error(errors[k].message);
    });
  }, [errors]);

  const finalData =
    productsData?.data?.map((product) => {
      return {
        ...product,
        category:
          products[Math.floor(Math.random() * products.length)].category,
        images: products[Math.floor(Math.random() * products.length)].images,
      };
    }) || [];

  const onDeleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      deleteItem(id, {
        onSuccess: (data) => {
          toast.success(data.data.message);
          refetch();
        },
      });
    }
  };

  const onClick = (item) => {
    Object.entries(item).forEach(([k, v]) => {
      if (Object.keys(defaultValues).find((key) => k === key) || k === "id") {
        setValue(k, v);
      }
    });
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="mb-5 font-bold text-2xl text-center">Dashboard</h1>

        <div className=" my-6 mb-10 self-stretch">
          <div className=" justify-start w-full grid grid-cols-6">
            <Link className="p-2 bg-black rounded-md text-white text-center hover:opacity-70 transition-all" to={"user"}>
              Users
            </Link>
          </div>
        </div>
        <div className=" grid grid-cols-12">
          <div className="col-span-8">
            <div className=" grid grid-cols-3">
              {finalData.map((product) => {
                return (
                  <Card
                    key={product.id}
                    item={product}
                    onDelete={onDeleteItem}
                    onClick={onClick}
                  />
                );
              })}
            </div>
          </div>
          <div className=" col-span-4">
            <form action="">
              <div className="px-5 pb-5">
                <input
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  })}
                  placeholder="Name"
                  className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                />
                <input
                  {...register("des", {
                    required: {
                      value: true,
                      message: "Description is required",
                    },
                  })}
                  placeholder="Description"
                  className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                />
                <div className="flex">
                  <div className="flex-grow w-1/4 pr-2">
                    <input
                      {...register("price", {
                        required: {
                          value: true,
                          message: "Price is required",
                        },
                        valueAsNumber: true,
                        min: {
                          value: 1000,
                          message: "Price must be greater than 1000",
                        },
                      })}
                      placeholder="Price"
                      className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                  </div>
                  <div className="flex-grow">
                    <input
                      {...register("quantity", {
                        required: {
                          value: true,
                          message: "Quantity is required",
                        },
                        min: {
                          value: 1,
                          message: "Quantity must greater than 1",
                        },
                      })}
                      placeholder="Quantity"
                      className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={handleSubmit((data) => {
                    mutate(data);
                  })}
                  className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-900  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out"
                >
                  <span className="pl-2 mx-1">Creating Product</span>
                </button>
                <button
                  type="button"
                  onClick={handleSubmit((data) => {
                    console.log(data);
                    mutateUpdate(data);
                  })}
                  className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-900  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out"
                >
                  <span className="pl-2 mx-1">Updating Product</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
