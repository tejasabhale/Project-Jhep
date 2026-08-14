import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import SchoolStats from "../../../components/admin/schools/SchoolStats";
import SchoolSearch from "../../../components/admin/schools/SchoolSearch";
import SchoolTable from "../../../components/admin/schools/SchoolTable";
import SchoolModal from "../../../components/admin/schools/SchoolModal";
import DeleteSchoolModal from "../../../components/admin/schools/DeleteSchoolModal";

import {
  getAllSchoolsForAdmin,
  createSchool,
  updateSchool,
  deleteSchool,
  toggleSchoolStatus,
} from "../../../api/school.api";

const ManageSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState(null);

  const fetchSchools = async () => {
    try {
      setLoading(true);

      const response = await getAllSchoolsForAdmin();

      setSchools(response?.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch schools:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  const filteredSchools = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return schools.filter((school) => {
      const matchesSearch =
        !searchValue ||
        school.name?.toLowerCase().includes(searchValue) ||
        school.location?.toLowerCase().includes(searchValue);

      const matchesStatus =
        status === "all" ||
        (status === "active" && school.isActive === true) ||
        (status === "inactive" && school.isActive === false);

      return matchesSearch && matchesStatus;
    });
  }, [schools, search, status]);

  const handleAddSchool = () => {
    setSelectedSchool(null);
    setIsSchoolModalOpen(true);
  };

  const handleEditSchool = (school) => {
    setSelectedSchool(school);
    setIsSchoolModalOpen(true);
  };

  const handleSchoolSubmit = async (formData) => {
    try {
      setActionLoading(true);

      if (selectedSchool) {
        await updateSchool(selectedSchool._id, formData);
      } else {
        await createSchool(formData);
      }

      setIsSchoolModalOpen(false);
      setSelectedSchool(null);

      await fetchSchools();
    } catch (error) {
      console.error("Failed to save school:", error.response?.data || error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteClick = (school) => {
    setSchoolToDelete(school);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSchool = async () => {
    if (!schoolToDelete) return;

    try {
      setActionLoading(true);

      await deleteSchool(schoolToDelete._id);

      setIsDeleteModalOpen(false);
      setSchoolToDelete(null);

      await fetchSchools();
    } catch (error) {
      console.error("Failed to delete school:", error.response?.data || error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleStatus = async (school) => {
    try {
      setActionLoading(true);

      await toggleSchoolStatus(school._id);

      await fetchSchools();
    } catch (error) {
      console.error(
        "Failed to toggle school status:",
        error.response?.data || error,
      );
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              Manage Schools
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage schools partnered with Project Jhep.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddSchool}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
          >
            <Plus size={18} />
            Add School
          </button>
        </div>

        <SchoolStats schools={schools} />

        <SchoolSearch
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
        />

        {loading ? (
          <div className="rounded-2xl border border-orange-100 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500" />

            <p className="mt-4 text-sm text-gray-500">Loading schools...</p>
          </div>
        ) : (
          <SchoolTable
            schools={filteredSchools}
            onEdit={handleEditSchool}
            onDelete={handleDeleteClick}
            onToggleStatus={handleToggleStatus}
          />
        )}
      </div>

      <SchoolModal
        isOpen={isSchoolModalOpen}
        school={selectedSchool}
        onClose={() => {
          if (!actionLoading) {
            setIsSchoolModalOpen(false);
            setSelectedSchool(null);
          }
        }}
        onSubmit={handleSchoolSubmit}
        loading={actionLoading}
      />

      <DeleteSchoolModal
        school={schoolToDelete}
        isOpen={isDeleteModalOpen}
        onClose={() => {
          if (!actionLoading) {
            setIsDeleteModalOpen(false);
            setSchoolToDelete(null);
          }
        }}
        onConfirm={handleDeleteSchool}
        loading={actionLoading}
      />
    </div>
  );
};

export default ManageSchools;
