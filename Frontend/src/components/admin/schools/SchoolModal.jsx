import React from "react";
import AdminModal from "../ui/AdminModal";
import SchoolForm from "./SchoolForm";

export default function SchoolModal({
  isOpen,
  school,
  onClose,
  onSubmit,
  loading = false,
}) {
  const isEditMode = Boolean(school);

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Partner School" : "Add Partner School"}
      description={
        isEditMode
          ? "Update school details, location, and visibility."
          : "Add an educational partner school to Project Jhep."
      }
      loading={loading}
    >
      <SchoolForm
        school={school}
        onSubmit={onSubmit}
        onCancel={onClose}
        loading={loading}
      />
    </AdminModal>
  );
}
