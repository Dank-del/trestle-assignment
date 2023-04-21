import {Fragment, useEffect, useRef, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./stores/appState";
import {navModalSlice} from "./stores/postItemSlice";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "./utils/firebase";
import {
    CloudArrowUpIcon,
    LockClosedIcon
} from '@heroicons/react/24/outline'
import {useForm} from "react-hook-form";
import {addDoc, collection, getDocs} from "firebase/firestore";
import NoteList, {IItem} from "./components/NoteList";


type TaskInput = {
    title: string;
    description: string;
}

const features = [
    {
        name: 'Quick Updates',
        description: 'Notes update immediately in real time',
        icon: CloudArrowUpIcon,
    },
    {
        name: 'Secure',
        description: 'Your data is secured in google cloud',
        icon: LockClosedIcon,
    },
]

function App() {
    const [user] = useAuthState(auth);
    const isOpen = useSelector((state: RootState) => state.navModal.open);
    const dispatch = useDispatch();
    const noteInputForm = useForm<TaskInput>();
    const [notes, setNotes] = useState<IItem[] | null>(null);

    const handleSubmit = noteInputForm.handleSubmit(async data => {
        const tasksCollection = collection(db, "users", user!.uid, "notes");
        try {
            const docRef = await addDoc(tasksCollection, data);
            console.log("Note added with ID: ", docRef.id);
            alert(`Note added with ID: ${docRef.id}`);
        } catch (error) {
            console.error("Error adding Note: ", error);
            alert(`Error adding Note: ${error}`);
        }
        handleChange();
        noteInputForm.reset();
        window.location.reload();
    })

    const getNotes = async () => {
        const notesCollection = collection(db, "users", user!.uid, "notes");
        const data = await getDocs(notesCollection)
        const itemList: IItem[] = []
        data.docs.map((d) => {
            console.log(d.id);
            const Item: IItem = d.data() as IItem;
            Item.id = d.id;
            itemList.push(Item);
        })
        return itemList;
    }

    console.log(notes);

    useEffect(() => {
        if (user) {
            getNotes().then((data) => setNotes(data))
        }
    }, [user])

    const handleChange = () => {
        dispatch(isOpen ? navModalSlice.actions.close() : navModalSlice.actions.open());
    };
    const cancelButtonRef = useRef(null)
    if (!user) {
        return <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">Save your notes</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Everything you need to save your notes more efficiently
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div
                                        className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true"/>
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    }
    return (
        <div>
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={handleChange}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel
                                    className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <div>
                                        <div className="mt-1 text-center sm:mt-5">
                                            <Dialog.Title as="h3"
                                                          className="text-3xl mb-4 font-medium leading-6 text-gray-900">
                                                Create new Note
                                            </Dialog.Title>
                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                <div>
                                                    <label htmlFor="title"
                                                           className="block text-sm font-medium text-gray-700">
                                                        Note Title
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            {...noteInputForm.register("title")}
                                                            title="Note Title"
                                                            name="title"
                                                            id="title"
                                                            type="text"
                                                            required
                                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="description"
                                                           className="block text-sm font-medium text-gray-700">
                                                        Description
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            {...noteInputForm.register("description")}
                                                            id="description"
                                                            name="description"
                                                            type="text"
                                                            required
                                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <button
                                                        type="submit"
                                                        className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    >
                                                        Create
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <div className="mt-2 mb-3">
                {notes && <NoteList items={notes} userId={user.uid}/>}
            </div>
        </div>
    )
}

export default App
