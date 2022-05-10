import "bootstrap/dist/css/bootstrap.min.css";
import AddTopic from "./AddTopic";
import SearchTopic from "./SearchTopic";

export default function Home() {
  return (
    <div>
      <AddTopic />
      <SearchTopic />
    </div>
  );
}
