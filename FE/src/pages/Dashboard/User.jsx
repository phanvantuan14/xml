import { useForm } from "react-hook-form";
import { Layout } from "../../components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsers, newUser, updateUser } from "../../apis";
import { toast } from "react-toastify";
import { CiTrash } from "react-icons/ci";
import { useEffect } from "react";

function User() {
  const { mutate } = useMutation({
    mutationFn: newUser,
    mutationKey: ["new-user"],
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
    mutationFn: updateUser,
    mutationKey: ["update-user"],
    onSuccess: (data) => {
      toast.success(data.data.message);
      reset();
      refetch();
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  const { data: userData, refetch } = useQuery({
    queryKey: ["get-users"],
    queryFn: getUsers,
    refetchOnWindowFocus: false,
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
      age: 1,
      password: "",
      phone: 0,
      email: 0,
    },
  });

  const onSelect = (item) => {
    Object.entries(item).forEach(([k, v]) => {
      if (Object.keys(defaultValues).find((key) => k === key)) {
        setValue(k, v);
      }
    });
  };

  useEffect(() => {
    Object.keys(errors || {}).forEach((k) => {
      toast.error(errors[k].message);
    });
  }, [errors]);

  return (
    <Layout>
      <div className="mx-auto container">
        <div>User</div>
        <div className="grid grid-cols-12">
            <div className="col-span-8">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">Name</th>
                  <th scope="col" className="px-6 py-4">Age</th>
                  <th scope="col" className="px-6 py-4">Email</th>
                  <th scope="col" className="px-6 py-4">Phone</th>
                  <th scope="col" className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                    (userData?.data || []).map((user, index) => {
                        const {name, age, phone, email} = user;
                        return (
                            <tr role="button" onClick={() => onSelect(user)} key={user?.email} className=" cursor-pointer border-b dark:border-neutral-500">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                                <td className="whitespace-nowrap px-6 py-4">{name}</td>
                                <td className="whitespace-nowrap px-6 py-4">{age}</td>
                                <td className="whitespace-nowrap px-6 py-4">{email}</td>
                                <td className="whitespace-nowrap px-6 py-4">{phone}</td>
                                <td className="whitespace-nowrap px-6 py-4">
                                <button className="p-2 bg-black rounded-md">
                                    <CiTrash className="  text-xl text-white hover:animate-bounce"/>
                                </button>
                                </td>
                             
                          </tr>
                        )
                    })
                }
             
                
              </tbody>
            </table>
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
                  {...register("age", {
                    required: {
                      value: true,
                      message: "Age is required",
                    },
                    min: {
                        value: 1,
                        message: "Age must be greater than 1"
                    },
                    valueAsNumber: true
                  })}
                  placeholder="age"
                  className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                />

                 <input
                  {...register("password", {
                    required: {
                      value: true,
                      message: "password is required",
                    },
                  })}
                  placeholder="password"
                  className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                />
                <div className="flex">
                  <div className="flex-grow w-1/4 pr-2">
                    <input
                      {...register("phone", {
                        required: {
                          value: true,
                          message: "Phone is required",
                        },
                        valueAsNumber: true,
                      })}
                      placeholder="phone"
                      className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                  </div>
                  <div className="flex-grow">
                    <input
                      {...register("email", {
                        required: {
                          value: true,
                          message: "email is required",
                        },
                      })}
                      placeholder="email"
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
                  <span className="pl-2 mx-1">Creating User</span>
                </button>
                <button
                  type="button"
                  onClick={handleSubmit((data) => {
                    mutateUpdate(data);
                  })}
                  className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-900  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out"
                >
                  <span className="pl-2 mx-1">Updating User</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default User;
