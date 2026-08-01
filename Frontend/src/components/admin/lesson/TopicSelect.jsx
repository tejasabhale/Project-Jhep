export default function TopicSelect({ topics = [], value, onChange }) {
  return (
    <div>
      <label className="block font-medium mb-2">Select Topic</label>

      <select
        name="topic"
        value={value}
        onChange={(e) => {
          console.log("Selected Topic ID:", e.target.value);
          onChange(e);
        }}
        required
        className="
          w-full
          border
          rounded-xl
          px-4
          py-3
          outline-none
          focus:ring-2
          focus:ring-orange-400
        "
      >
        <option value="">Choose topic</option>

        {topics.map((topic) => (
          <option key={topic._id} value={topic._id}>
            {topic.title}
          </option>
        ))}
      </select>
    </div>
  );
}
