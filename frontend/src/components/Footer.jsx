export default function Footer() {
  return (
    <footer className="ct-footer mt-auto">
      <div className="container d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
        <p className="mb-0">&copy; 2026 CampusTrade. All rights reserved.</p>
        <p className="mb-0 text-secondary small">
          Built with React.js &amp; Django REST Framework
        </p>
      </div>
    </footer>
  );
}