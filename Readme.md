# Book Store (API project)
[![fa](https://img.shields.io/badge/click_to_README-FARSI-red.svg)](https://igit.partdp.ir/college/backpack4/musa-ku-taghi/bookstore/-/wikis/READMEFARSI)
[![todo](https://img.shields.io/badge/list_of-TODO-green.svg)](https://igit.partdp.ir/college/backpack4/musa-ku-taghi/bookstore/-/wikis/todo)
[![ref](https://img.shields.io/badge/list_of-Refrences-blue.svg)](https://igit.partdp.ir/college/backpack4/musa-ku-taghi/bookstore/-/wikis/refrences)

This repository contains the code for BookStore, an online bookstore application with two sub-programs: a server and a bookstore client.

## Applications
BookStore provides two applications:

* **Server**: This program handles user requests, manages book data, and interacts with a database (not included in this repository).
* **Bookstore Client**: This is the user interface for browsing and managing books.


## Running

### prerequisites
* Node.js, npm and Part Framework

### instruction

1. clone this repsitory
    ```bash
    git clone https://igit.partdp.ir/college/backpack4/musa-ku-taghi/bookstore.git
    ```

2. Navigate to the project directory:
    ```bash
    cd bookstore
    ```

3. Install dependencies in both the `fileserver` and `bookstore` folders:
    * Navigate to the `fileserver` folder
        ```bash
        cd server
        ```
    * install dependencies
        ```bash
        npm install
        ```
    * Navigate to the `bookstore` folder:
        ```bash
        cd bookstore
        ```
    * install dependencies
        ```bash
        npm install
        ```
4. start the server:
Enter the fileserver and bookstore folders again and enter the following command:
    ```bash
    npm start
    ```

This will launch the server and open the bookstore interface in your web browser (usually at http://localhost:4001 by default).

**Note**: You may need to adjust the port number in your code or browser settings if it conflicts with another application.

## Participating in the Program
This project is currently not set up for public participation. However, if you're interested in contributing, you can fork the repository, make changes, and submit a pull request.

## Communication
If you have any questions or suggestions related to this project, please create an issue on this repository.