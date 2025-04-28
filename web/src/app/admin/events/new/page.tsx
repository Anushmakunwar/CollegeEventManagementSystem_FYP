"use client";
import { URLS } from "@/constants";
import usePost from "@/hooks/usePost";
import { FormSchema } from "@/validator/createEvent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

export default function newEvent() {
  type EventForm = z.infer<typeof FormSchema>;
  const { postMutation, isError, isSuccess, data, error, success, isPending } =
    usePost("adminEvent");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EventForm>({
    // resolver: zodResolver(FormSchema),
  });

  const {
    fields: hosts,
    append: addHost,
    remove: removeHost,
  } = useFieldArray({
    control: control,
    name: "hostNames", 
  });

  const {
    fields: guests,
    append: addGuest,
    remove: removeGuest,
  } = useFieldArray({
    control,
    name: "guestNames",
  });

  useEffect(() => {
    if (isSuccess) {
      router.push("/admin/events");
    }
  }, [data]);

  const onSubmit = (data: any) => {
    data.guestNames = data.guestNames.map((el: any) => el.name);
    data.hostNames = data.hostNames.map((el: any) => el.name);
    console.log(data);
    postMutation({ url: URLS.EVENT, data });
  };

  return (
    <div className="px-6 py-10 w-full mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Create Event</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Event Name */}
        <div>
          <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">
            Event Name
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            placeholder="Basic IT Literacy"
            className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
          />
          {errors.name && <p className="text-red-600 mt-1">{errors.name.message}</p>}
        </div>

        {/* Event Description */}
        <div>
          <label htmlFor="description" className="block text-lg font-semibold text-gray-700 mb-2">
            Event Description
          </label>
          <textarea
            className="w-full h-40 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
            {...register("description")}
            id="description"
            placeholder="Your event description here"
          ></textarea>
          {errors.description && <p className="text-red-600 mt-1">{errors.description.message}</p>}
        </div>

        {/* Hosts */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Hosts</label>
          {hosts.map((host, index) => (
            <div key={host.id} className="flex items-center space-x-2 mb-3">
              <input
                {...register(`hostNames.${index}.name`)}
                type="text"
                placeholder="Host Name"
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
              />
              <button
                type="button"
                onClick={() => removeHost(index)}
                className="px-3 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-200"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addHost({ name: "" })}
            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Add Host
          </button>
          {errors.hostNames && <p className="text-red-600 mt-1">{errors.hostNames.message}</p>}
        </div>

        {/* Guests */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Guests</label>
          {guests.map((guest, index) => (
            <div key={guest.id} className="flex items-center space-x-2 mb-3">
              <input
                {...register(`guestNames.${index}.name`)}
                type="text"
                placeholder="Guest Name"
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
              />
              <button
                type="button"
                onClick={() => removeGuest(index)}
                className="px-3 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-200"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addGuest({ name: "" })}
            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Add Guest
          </button>
          {errors.guestNames && <p className="text-red-600 mt-1">{errors.guestNames.message}</p>}
        </div>

        {/* Venue */}
        <div>
          <label htmlFor="venue" className="block text-lg font-semibold text-gray-700 mb-2">
            Venue
          </label>
          <input
            {...register("venue")}
            id="venue"
            type="text"
            placeholder="Event Venue"
            className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
          />
          {errors.venue && <p className="text-red-600 mt-1">{errors.venue.message}</p>}
        </div>

        {/* Registration Deadline */}
        <div>
          <label
            htmlFor="registrationDeadline"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Registration Deadline
          </label>
          <input
            {...register("registrationDeadline", { valueAsDate: true })}
            id="registrationDeadline"
            type="date"
            className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
          />
          {errors.registrationDeadline && (
            <p className="text-red-600 mt-1">{errors.registrationDeadline.message}</p>
          )}
        </div>

        {/* Event Date-Time */}
        <div>
          <label htmlFor="startTime" className="block text-lg font-semibold text-gray-700 mb-2">
            Event Date-Time
          </label>
          <input
            {...register("startTime", { valueAsDate: true })}
            id="startTime"
            type="datetime-local"
            className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
          />
          {errors.startTime && <p className="text-red-600 mt-1">{errors.startTime.message}</p>}
        </div>

        {/* Event End Date-Time */}
        <div>
          <label htmlFor="endTime" className="block text-lg font-semibold text-gray-700 mb-2">
            Event End Date-Time
          </label>
          <input
            {...register("endTime", { valueAsDate: true })}
            id="endTime"
            type="datetime-local"
            className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
          />
          {errors.endTime && <p className="text-red-600 mt-1">{errors.endTime.message}</p>}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full h-12 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition duration-200"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
}
