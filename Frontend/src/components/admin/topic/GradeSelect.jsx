const grades = [
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
];

export default function GradeSelect({ value, onChange }) {
  return (
    <div>
      <label className="mb-2 block font-medium">Grade</label>

      <select
        required
        name="grade"
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
      >
        <option value="">Select Grade</option>

        {grades.map((grade) => (
          <option key={grade} value={grade}>
            {grade}
          </option>
        ))}
      </select>
    </div>
  );
}
