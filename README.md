This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This Project is currently host on Vercel at [https://book-managment-six.vercel.app](https://book-managment-six.vercel.app)

## Getting Started

Isbn Book management system written as a next js react web app. Add book to your list based on isbn (10 or 13), rate it, and remove it. Book data is recieved from open library [https://openlibrary.org/developers/api](https://openlibrary.org/developers/api). Data is stored in local storage using react redux and uses redux persist to survive refreshes. 

Makes sure to have npm and Node.js 18.17 or later. My versions were:
  npm: '9.8.0',
  node: '20.0.0',

Clone the repository by running git clone in terminal 

```bash
git clone https://github.com/charm0900/BookManagment.git
```

Move into the BookManagment directoy
```bash
cd BookManagment
```

Download dependencies with npm
```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Tests

There are Jest test for ISBN vaildation, confirming to only allow isbn 10 or 13, as well as validating the isbn based on its check sum. Isbn check sum needs to sum the multiplication of each digit in isbn times a specific number. To run these test use the following command in the BookManagement folder while the project isnt running: 

```bash
npm test
```



