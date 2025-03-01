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
    usePost("schoolAdminEvent");
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
    name: "hostNames", // Field array for hosts
  });

  const {
    fields: guests,
    append: addGuest,
    remove: removeGuest,
  } = useFieldArray({
    control,
    name: "guestNames", // Field array for guests
  });

  useEffect(() => {
    if (isSuccess) {
      router.push("/schooladmin/events");
    }
  }, [data]);

  const onSubmit = (data: any) => {
    data.guestNames = data.guestNames.map((el: any) => el.name);
    // console.log(data);
    data.hostNames = data.hostNames.map((el: any) => el.name);
    // data.description = "Event description here";
    // data.registrationDeadline = "2021-01-30T23:59:59Z";
    // data.startTime = "2021-01-01T10:00:00Z";
    // data.endTime = "2021-01-01T12:00:00Z";
    // data.date = "2021-01-30T23:59:59Z";
    console.log(data);
    postMutation({ url: URLS.EVENT, data });
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Event Name */}
        <div>
          <label htmlFor="name" className="block text-2xl font-bold p-2">
            Event Name
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            placeholder="Basic IT Literacy"
            className="w-full h-12 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Event Description */}
        <div>
          <label htmlFor="description" className="block text-2xl font-bold p-2">
            Event Description
          </label>
          <textarea
            className="w-full h-[150px] px-4 border resize-y focus:outline-none focus:ring-2 focus:ring-green-300"
            {...register("description")}
            id="description"
            placeholder="Your event description here"
          ></textarea>
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Hosts */}
        <div>
          <label className="block text-2xl font-bold p-2">Hosts</label>
          {hosts.map((host, index) => (
            <div key={host.id} className="flex items-center space-x-2 mb-2">
              <input
                {...register(`hostNames.${index}.name`)}
                type="text"
                placeholder="Host Name"
                className="w-full h-12 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              <button
                type="button"
                onClick={() => removeHost(index)}
                className="px-2 py-1 text-white bg-red-500 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addHost({ name: "" })}
            className="px-4 py-2 text-white bg-blue-500 rounded"
          >
            Add Host
          </button>
          {errors.hostNames && (
            <p className="text-red-500">{errors.hostNames.message}</p>
          )}
        </div>

        {/* Guests */}
        <div>
          <label className="block text-2xl font-bold p-2">Guests</label>
          {guests.map((guest, index) => (
            <div key={guest.id} className="flex items-center space-x-2 mb-2">
              <input
                {...register(`guestNames.${index}.name`)}
                type="text"
                placeholder="Guest Name"
                className="w-full h-12 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              <button
                type="button"
                onClick={() => removeGuest(index)}
                className="px-2 py-1 text-white bg-red-500 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addGuest({ name: "" })}
            className="px-4 py-2 text-white bg-blue-500 rounded"
          >
            Add Guest
          </button>
          {errors.guestNames && (
            <p className="text-red-500">{errors.guestNames.message}</p>
          )}
        </div>

        {/* Venue */}
        <div>
          <label htmlFor="venue" className="block text-2xl font-bold p-2">
            Venue
          </label>
          <input
            {...register("venue")}
            id="venue"
            type="text"
            placeholder="Event Venue"
            className="w-full h-12 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          {errors.venue && (
            <p className="text-red-500">{errors.venue.message}</p>
          )}
        </div>

        {/* Registration Deadline */}
        <div>
          <label
            htmlFor="registrationDeadline"
            className="block text-2xl font-bold p-2"
          >
            Registration Deadline
          </label>
          <input
            {...register("registrationDeadline", { valueAsDate: true })}
            id="registrationDeadline"
            type="date"
            className="w-full h-12 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          {errors.registrationDeadline && (
            <p className="text-red-500">
              {errors.registrationDeadline.message}
            </p>
          )}
        </div>

        {/* Event Day */}
        <div>
          <label htmlFor="startTime" className="block text-2xl font-bold p-2">
            Event Date-Time
          </label>
          <input
            {...register("startTime", { valueAsDate: true })}
            id="startTime"
            type="datetime-local"
            className="w-full h-12 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          {errors.startTime && (
            <p className="text-red-500">{errors.startTime.message}</p>
          )}
        </div>

        {/* Event Day */}
        <div>
          <label htmlFor="endTime" className="block text-2xl font-bold p-2">
            Event End Date-Time
          </label>
          <input
            {...register("endTime", { valueAsDate: true })}
            id="endTime"
            type="datetime-local"
            className="w-full h-12 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          {errors.endTime && (
            <p className="text-red-500">{errors.endTime.message}</p>
          )}
        </div>

        {/* Faculty Dropdown */}
        {/* <div>
          <label htmlFor="faculty" className="block text-2xl font-bold p-2">
            Faculty
          </label>
          <select
            {...register("faculty")}
            id="faculty"
            className="w-full h-12 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            <option value="">Select Faculty</option>
            <option value="all">All Faculties</option>
            <option value="science">Science</option>
            <option value="commerce">Commerce</option>
            <option value="arts">Arts</option>
          </select>
          {errors.faculty && (
            <p className="text-red-500">{errors.faculty.message}</p>
          )}
        </div> */}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full h-12 bg-green-400 text-white font-bold rounded-full hover:bg-green-500"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
}
