import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
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
    const userID = localStorage.getItem("userID");
    const idRef = useRef([]);
    const titleRef = useRef([]);
    const descriptionRef = useRef([]);
    const isbnRef = useRef([]);
    const pagesRef = useRef([]);
    const yearRef = useRef([]);
    const publisherRef = useRef([]);
    const checkedOutByRef = useRef([]);

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
            setBooks(response.data);
        } catch (error) {
            console.log(error)
            setMessage("Could not get the list of books! Please Refresh!")
            setShow(true);
        }
    }

    async function addBook() {
        try {
            await axios.post("http://localhost:8080/book", {
                token: token,
                title: titleRef.current[0].value,
                description: descriptionRef.current[0].value,
                isbn: isbnRef.current[0].value,
                pages: pagesRef.current[0].value,
                year: yearRef.current[0].value,
                publisher: publisherRef.current[0].value,
                checkedoutby: checkedOutByRef.current[0].value
            })
            titleRef.current[0].value = '';
            descriptionRef.current[0].value = '';
            isbnRef.current[0].value = '';
            pagesRef.current[0].value = '';
            yearRef.current[0].value = '';
            publisherRef.current[0].value = '';
            getBooks();
            setMessage("Successfully added book!")
            setShow(true);
        } catch (error) {
            console.log(error)
            setMessage("Could not get the list of books! Please Refresh!")
            setShow(true);
        }
    }

    async function editBook(id) {
        try {
            await axios.put("http://localhost:8080/book", {
                token: token,
                bookid: id,
                title: titleRef.current[id].value,
                description: descriptionRef.current[id].value,
                isbn: isbnRef.current[id].value,
                pages: pagesRef.current[id].value,
                year: yearRef.current[id].value,
                publisher: publisherRef.current[id].value,
                checkedoutby: checkedOutByRef.current[id].value
            })
            getBooks();
            setMessage("Successfully updated book!")
            setShow(true);
            //window.location.reload();
        } catch (error) {
            console.log(error)
            setMessage("Could not edit the book! Please Try Again!")
            setShow(true);
        }
    }

    async function deleteBook(id) {
        try {
            console.log("Token: ", token)
            await axios.delete("http://localhost:8080/book", {
                data: {
                    token: token,
                    bookid: id
                }
            })
            //window.location.reload();
            getBooks();
            setMessage("Successfully deleted book!")
            setShow(true);
        } catch (error) {
            console.log(error)
            setMessage("Could not delete the book! Please Try Again!")
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
                                {/* <Form.Control readOnly id="0-title" ref={el => { idRef.current[0] = el }} value={bookCount + 1} /> */}
                            </td>
                            <td>
                                <Form.Control id="0-title" ref={el => { titleRef.current[0] = el }} defaultValue='' />
                            </td>
                            <td>
                                <Form.Control id="0-description" ref={el => { descriptionRef.current[0] = el }} defaultValue='' />
                            </td>
                            <td>
                                <Form.Control id="0-isbn" ref={el => { isbnRef.current[0] = el }} defaultValue='' />
                            </td>
                            <td>
                                <Form.Control id="0-pages" ref={el => { pagesRef.current[0] = el }} defaultValue='' />
                            </td>
                            <td>
                                <Form.Control id="0-year" ref={el => { yearRef.current[0] = el }} defaultValue='' />
                            </td>
                            <td>
                                <Form.Control id="0-publisher" ref={el => { publisherRef.current[0] = el }} defaultValue='' />
                            </td>
                            <td>
                                <Form.Control id="0-checkedoutby" ref={el => { checkedOutByRef.current[0] = el }} defaultValue={userID} />
                            </td>
                            <td>
                                <Button onClick={addBook}><AiOutlinePlus /></Button>
                            </td>
                        </tr>
                        {
                            books.map((book, index) => {
                                return (
                                    <tr key={book.bookid}>
                                        <td>
                                            <Form.Control readOnly ref={el => { idRef.current[book.bookid] = el }} value={book.bookid} />
                                        </td>
                                        <td>
                                            <Form.Control ref={el => { titleRef.current[book.bookid] = el }} defaultValue={book.title} />
                                        </td>
                                        <td>
                                            <Form.Control ref={el => { descriptionRef.current[book.bookid] = el }} defaultValue={book.description} />
                                        </td>
                                        <td>
                                            <Form.Control ref={el => { isbnRef.current[book.bookid] = el }} defaultValue={book.isbn} />
                                        </td>
                                        <td>
                                            <Form.Control ref={el => { pagesRef.current[book.bookid] = el }} defaultValue={book.pages} />
                                        </td>
                                        <td>
                                            <Form.Control ref={el => { yearRef.current[book.bookid] = el }} defaultValue={book.year} />
                                        </td>
                                        <td>
                                            <Form.Control ref={el => { publisherRef.current[book.bookid] = el }} defaultValue={book.publisher} />
                                        </td>
                                        <td>
                                            <Form.Control ref={el => { checkedOutByRef.current[book.bookid] = el }} defaultValue={book.checkedoutby} />
                                        </td>
                                        <td>
                                            <Button onClick={() => editBook(book.bookid)}><AiTwotoneEdit /></Button>
                                        </td>
                                        <td>
                                            <Button onClick={() => deleteBook(book.bookid)}><AiFillDelete /></Button>
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