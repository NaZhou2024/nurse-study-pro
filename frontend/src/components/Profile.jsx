import { getTopics } from "../api";

useEffect(() => {
  getTopics().then(setTopics);
}, []);
