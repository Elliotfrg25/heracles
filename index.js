import { listen } from './App';

const port = process.env.PORT || 3001;

listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
