export const Dialog = ({
  children,
  id,
  title,
  description,
}: {
  children: React.ReactNode;
  id: string;
  title: string;
  description: string;
}) => {
  return (
    <dialog
      id={id}
      class="dialog w-full sm:max-w-[425px] max-h-[612px]"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
      onclick="this.close()"
    >
      <article onclick="event.stopPropagation()">
        <header>
          <h2 id={`${id}-title`}>{title}</h2>
          <p id={`${id}-description`}>{description}</p>
        </header>
        <section>{children}</section>
        <form method="dialog">
          <button aria-label="Close dialog">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-x-icon lucide-x"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </form>
      </article>
    </dialog>
  );
};

export const openDialog = (id: string) =>
  `document.getElementById("${id}").showModal();`;

export const closeDialog = (id: string) =>
  `document.getElementById("${id}").close();`;
