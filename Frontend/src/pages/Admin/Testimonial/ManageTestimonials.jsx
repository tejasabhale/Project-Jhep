import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import TestimonialStats from "../../../components/admin/testimonials/TestimoniaStats";
import TestimonialSearch from "../../../components/admin/testimonials/TestimonialSearch";
import TestimonialTable from "../../../components/admin/testimonials/TestimonialTable";
import TestimonialModal from "../../../components/admin/testimonials/TestimonialModal";

import {
  getAllTestimonialsForAdmin,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../../../api/testimonial.api";

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchTestimonials = async () => {
    try {
      setFetching(true);

      const response = await getAllTestimonialsForAdmin();

      const data = Array.isArray(response?.data) ? response.data : [];

      setTestimonials(data);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
      setTestimonials([]);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const filteredTestimonials = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return testimonials;
    }

    return testimonials.filter((testimonial) =>
      `${testimonial.name} ${testimonial.grade} ${testimonial.review}`
        .toLowerCase()
        .includes(query),
    );
  }, [testimonials, search]);

  const handleAdd = () => {
    setSelectedTestimonial(null);
    setIsModalOpen(true);
  };

  const handleEdit = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const handleDelete = async (testimonial) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${testimonial.name}'s testimonial?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      await deleteTestimonial(testimonial._id);

      setTestimonials((prev) =>
        prev.filter((item) => item._id !== testimonial._id),
      );
    } catch (error) {
      console.error("Failed to delete testimonial:", error);

      alert(error?.response?.data?.message || "Failed to delete testimonial");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      if (selectedTestimonial) {
        const response = await updateTestimonial(selectedTestimonial._id, data);

        const updatedTestimonial = response?.data;

        if (updatedTestimonial) {
          setTestimonials((prev) =>
            prev.map((item) =>
              item._id === selectedTestimonial._id ? updatedTestimonial : item,
            ),
          );
        }
      } else {
        const response = await createTestimonial(data);

        const newTestimonial = response?.data;

        if (newTestimonial) {
          setTestimonials((prev) => [newTestimonial, ...prev]);
        }
      }

      setIsModalOpen(false);
      setSelectedTestimonial(null);
    } catch (error) {
      console.error("Failed to save testimonial:", error);

      alert(error?.response?.data?.message || "Failed to save testimonial");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Manage Testimonials
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage student feedback and testimonials displayed on Project
              Jhep.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            <Plus size={18} />
            Add Testimonial
          </button>
        </div>

        <TestimonialStats testimonials={testimonials} />

        <div className="flex flex-col gap-3 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <TestimonialSearch value={search} onChange={setSearch} />

          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {filteredTestimonials.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-700">
              {testimonials.length}
            </span>{" "}
            testimonials
          </p>
        </div>

        {fetching ? (
          <div className="rounded-2xl border border-orange-100 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />

            <p className="mt-3 text-sm text-gray-500">
              Loading testimonials...
            </p>
          </div>
        ) : filteredTestimonials.length === 0 ? (
          <div className="rounded-2xl border border-orange-100 bg-white p-10 text-center shadow-sm">
            <p className="text-sm font-medium text-gray-700">
              No testimonials found
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {search
                ? "Try changing your search."
                : "Add your first testimonial."}
            </p>
          </div>
        ) : (
          <TestimonialTable
            testimonials={filteredTestimonials}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <TestimonialModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTestimonial(null);
        }}
        onSubmit={handleSubmit}
        testimonial={selectedTestimonial}
        loading={loading}
      />
    </div>
  );
};

export default ManageTestimonials;
