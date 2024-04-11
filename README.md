# PeerNotes (In Progress)
Repository for a course project of CS4675/CS6675 at Georgia Institute of Technology.

## Advisory for Contributors
<ul>
  <li>Please do not commit any code to the main branch directly</li>
  <li>Use feature branches, ideally with your name and the feature it is for mentioned in the branch name eg. feature_aman_login</li>
  <li>Raise a PR once you are ready and have checked your code for errors.</li>
  <li>Mention a bullet point summary for all the features you are pushing as part of the PR within the description to ease the review process</li>
</ul>

## Getting Started

### Frontend
For our frontend we are using React + Vite + TypeScript!

- **React** -> JavaScript Framework for creating reactive user interfaces.
- **Vite** -> Development environment / build tool. Gives us access to features like hot reload, bundling, and plugins.
- **TypeScript** -> A superset of JavaScript allowing for static types.

Here's how to set up + run the frontend environment:
1. Download and install [Node.js](https://nodejs.org/en/download) v18+ 
Check your node version:
```sh
node -v
```
2. Clone the repo using Git
3. Install dependencies
```sh
cd frontend
npm install
```
4. Start the development server
```sh
npm run dev
```
5. Visit http://localhost:5173