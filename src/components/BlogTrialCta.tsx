import { Button } from "@/components/ui/button";
import { enquiryBranches, type EnquiryBranch } from "@/lib/whatsapp";

type BlogTrialCtaProps = {
  id: string;
  trialType: "strength" | "general";
  branch: EnquiryBranch | "";
  onBranchChange: (branch: EnquiryBranch | "") => void;
  onRequest: () => void;
};

const BlogTrialCta = ({ id, trialType, branch, onBranchChange, onRequest }: BlogTrialCtaProps) => (
  <aside aria-label="Gym trial request" className="my-8 rounded-xl border border-primary/30 bg-primary/5 p-5">
    <p className="mb-3 font-bold">{trialType === "strength" ? "Try strength training at 365 Fitness" : "Try the gym at 365 Fitness"}</p>
    <label htmlFor={id} className="mb-2 block text-sm">Preferred trial branch</label>
    <select id={id} value={branch} onChange={(event) => onBranchChange(event.target.value as EnquiryBranch | "")} className="mb-4 w-full rounded border border-border bg-background p-3 text-base">
      <option value="">Select a branch</option>
      {Object.entries(enquiryBranches).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}
    </select>
    <Button type="button" onClick={onRequest} disabled={!branch} className="h-auto max-w-full whitespace-normal py-3">
      {trialType === "strength" ? "Request a Strength-Training Trial" : "Request a Free Gym Trial"}
    </Button>
    <p className="mt-3 text-sm">Complete the free-pass form, then send your request to our central free-trial team in WhatsApp.</p>
  </aside>
);

export default BlogTrialCta;
