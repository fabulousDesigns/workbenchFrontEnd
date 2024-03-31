import HOME from "./Home/home";

export const HomeContent = () => {
  return (
    <>
      <HOME />
    </>
  );
};

// AllContent.tsx
export const AllContent = () => {
  return <div>All content</div>;
};

// CompletedContent.tsx
export const CompletedContent = () => {
  return <div>Completed content</div>;
};

// PendingContent.tsx
export const PendingContent = () => {
  return <div>Pending content</div>;
};

// OverdueContent.tsx
export const OverdueContent = () => {
  return <div>Overdue content</div>;
};
