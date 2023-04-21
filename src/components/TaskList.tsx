import {doc, deleteDoc} from "firebase/firestore";
import {db} from "../utils/firebase";
import {
    TrashIcon
} from '@heroicons/react/24/outline'

export interface IItem {
    id: string;
    title: string;
    description: string;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function TaskList({items, userId}: { items: IItem[], userId: string }) {
    const deleteTask = async (id: string) => {
        const sure = confirm(`Are you sure you want to delete the Todo: ${id}`);
        if (!sure) {
            return
        }
        const taskDoc = doc(db, "users", userId, "tasks", id);
        await deleteDoc(taskDoc);
        alert(`Task deleted with ID: ${id}`)
        window.location.reload();
    }
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Tasks</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the Tasks in your account.
                    </p>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Task ID
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Title
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Description
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {items.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {item.id}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.title}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.description}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <button
                                                onClick={async () => await deleteTask(item.id)}
                                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
