/**
 * Medical Representatives Directory Data
 * 
 * Notice: Medical representative roster is not yet officially provided.
 * Schema structured for: Name, Division, Territory, Contact, Photo, Status
 */

export const REPRESENTATIVES_DATA = {
  title: "MEDICAL REPRESENTATIVES",
  subtitle: "Field Force & Medical Liaisons",
  notice: "Our medical representative directory will be updated here.",
  // Array structured for future backend injection
  representatives: [],
  meta: {
    schemaFields: [
      { key: "name", label: "Representative Name", type: "string" },
      { key: "division", label: "Division", type: "string" },
      { key: "territory", label: "Territory / Region", type: "string" },
      { key: "contact", label: "Contact / Coordination", type: "string" },
      { key: "photo", label: "Official Portrait", type: "image" },
      { key: "status", label: "Field Status", type: "status" }
    ],
    status: "awaiting_roster",
    readyForBackend: true
  }
};
