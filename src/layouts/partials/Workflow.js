import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";

const Workflow = ({ workflow }) => {
  if (!workflow?.image) return null;
  return (
    <section className="section pb-0">
      {(workflow.title || workflow.description) && (
        <div className="mb-8 text-center">
          {workflow.title &&
            markdownify(
              workflow.title,
              "h2",
              "mx-auto max-w-[400px] font-bold leading-[44px]",
            )}
          {workflow.description && markdownify(workflow.description, "p", "mt-3")}
        </div>
      )}
      <Image
        src={workflow.image}
        alt="workflow image"
        width={1920}
        height={400}
        className="h-auto w-full"
      />
    </section>
  );
};

export default Workflow;
