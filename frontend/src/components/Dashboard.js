import React, { useState, useEffect } from 'react';
import { Table, Button, Form} from 'react-bootstrap';
import '../styles/Bootstrap.scss';
import '../styles/Theme.css';
import '../styles/Dashboard.css';
import axios from "axios";
import NavBar from './NavBar';
import ModalMessage from './Modal';
import { AiOutlinePlus, AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';

export default function Dashboard() {
    // Declarations
    const [books, setBooks] = useState([]);
    const [bookCount, setBookCount] = useState(0);
    const token = localStorage.getItem("token");

    // Run on document load
    useEffect(() => {
        document.title = "Dashboard - Library";
    }, []);

    // Modal declarations
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const sendModalData = (value) => {
        setShow(value)
    }

    useEffect(() => {
        getBooks()
    }, [])

    async function getBooks() {
        try {
            const response = await axios.get("http://localhost:8080/books", {
                token: token
            })
            setBookCount(response.data.length);
            setBooks(response.data);
        } catch (error) {
            console.log(error)
            setMessage("Could not get the list of books! Please Refresh!")
            setShow(true);
        }
    }

    async function addBook() {
        try {
            const response = await axios.post("http://localhost:8080/book", {
                token: token
            })
            setBookCount(response.data.length);
        } catch (error) {
            console.log(error)
            setMessage("Could not get the list of books! Please Refresh!")
            setShow(true);
        }
    }

    return (
        <div className="all">
            {show ? <ModalMessage message={message} show={show} sendModalData={sendModalData} /> : null}
            <NavBar />
            <div className='primary Books'>
                <div className="Subject">
                    <h2>Books</h2>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>Book ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>ISBN</th>
                            <th>Pages</th>
                            <th>Year</th>
                            <th>Publisher</th>
                            <th>Checked Out By</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Form.Control readOnly id="0-title" value={bookCount + 1} />
                            </td>
                            <td>
                                <Form.Control id="0-title" defaultValue='' />
                            </td>
                            <td>
                                <Form.Control id="0-description" defaultValue='' />
                            </td>
                            <td>
                                <Form.Control id="0-isbn" defaultValue='' />
                            </td>
                            <td>
                                <Form.Control id="0-pages" defaultValue='' />
                            </td>
                            <td>
                                <Form.Control id="0-year" defaultValue='' />
                            </td>
                            <td>
                                <Form.Control id="0-publisher" defaultValue='' />
                            </td>
                            <td>
                                <Form.Control id="0-checkedoutby" defaultValue='' />
                            </td>
                            <td>
                                <Button><AiOutlinePlus /></Button>
                            </td>
                        </tr>
                        {
                            books.map((book, index) => {
                                return (
                                    <tr key={book.bookid}>
                                        <td>
                                            <Form.Control readOnly id={book.bookid + "-bookid"} value={book.bookid} />
                                        </td>
                                        <td>
                                            <Form.Control id={book.title + "-title"} defaultValue={book.title} />
                                        </td>
                                        <td>
                                            <Form.Control id={book.description + "-description"} defaultValue={book.description} />
                                        </td>
                                        <td>
                                            <Form.Control id={book.isbn + "-isbn"} defaultValue={book.isbn} />
                                        </td>
                                        <td>
                                            <Form.Control id={book.pages + "-pages"} defaultValue={book.pages} />
                                        </td>
                                        <td>
                                            <Form.Control id={book.year + "-year"} defaultValue={book.year} />
                                        </td>
                                        <td>
                                            <Form.Control id={book.publisher + "-publisher"} defaultValue={book.publisher} />
                                        </td>
                                        <td>
                                            <Form.Control id={book.checkedoutby + "-checkedoutby"} defaultValue={book.checkedoutby} />
                                        </td>
                                        <td>
                                            <Button><AiTwotoneEdit /></Button>
                                        </td>
                                        <td>
                                            <Button><AiFillDelete /></Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}