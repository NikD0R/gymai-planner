import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import {
  AlertCircle,
  Calendar,
  Dumbbell,
  RefreshCcw,
  Target,
  TrendingUp,
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { PlanDisplay } from "../components/plan/PlanDisplay";
import { useState } from "react";

export default function Profile() {
  const { user, isLoading, plan, generatePlan } = useAuth();
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [error, setError] = useState("");

  if (!user && !isLoading) {
    return (
      <Navigate
        to="/auth/sign-in"
        replace
      />
    );
  }

  if (!plan) {
    return (
      <Navigate
        to="/onboarding"
        replace
      />
    );
  }

  const handleRegenerate = async () => {
    try {
      setIsRegenerating(true);
      setError("");
      await generatePlan();
    } catch (error) {
      setError("Failed to regenerate your plan");
      console.error("Failed to regenerate plan:", error);
    } finally {
      setIsRegenerating(false);
    }
  };

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl max-[360px]:text-2xl font-bold mb-1">
              Your Training Plan
            </h1>
            <p className="text-[var(--color-muted)] max-[360px]:text-sm">
              Version {plan.version} • Created {formatDate(plan.createdAt)}
            </p>
          </div>

          <Button
            variant="secondary"
            className="gap-2 min-w-[170px] justify-center max-[360px]:text-sm"
            onClick={handleRegenerate}
            disabled={isRegenerating}
          >
            <RefreshCcw
              className={`w-4 h-4 ${isRegenerating ? "animate-spin" : ""}`}
            />
            {isRegenerating ? "Regenerating..." : "Regenerate Plan"}
          </Button>
        </div>

        {error && (
          <div className="flex items-center gap-3 p-4 mb-4 rounded-xl bg-red-700/20 border border-red-900/50">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />

            <div className="text-sm">
              <p className="font-semibold text-red-400">{error}</p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card variant="bordered">
            <div className="w-10 h-10 flex items-center justify-center">
              <Target className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <div>
              <p className="text-xs text-[var(--color-muted)]">Goal</p>
              <p className="font-medium text-sm">{plan.overview.goal}</p>
            </div>
          </Card>
          <Card
            variant="bordered"
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <div>
              <p className="text-xs text-[var(--color-muted)]">Frequency</p>
              <p className="font-medium text-sm">{plan.overview.frequency}</p>
            </div>
          </Card>
          <Card
            variant="bordered"
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <div>
              <p className="text-xs text-[var(--color-muted)]">Split</p>
              <p className="font-medium text-sm">{plan.overview.split}</p>
            </div>
          </Card>
          <Card
            variant="bordered"
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <div>
              <p className="text-xs text-[var(--color-muted)]">Version</p>
              <p className="font-medium text-sm">{plan.version}</p>
            </div>
          </Card>
        </div>

        <Card
          variant="bordered"
          className="mb-8"
        >
          <h2 className="font-semibold text-lg mb-2">Program Notes</h2>
          <p className="text-[var(--color-muted)] text-sm leading-relaxed">
            {plan.overview.notes}
          </p>
        </Card>

        <h2 className="font-semibold text-xl mb-4">Weekly Schedule</h2>
        <PlanDisplay weeklySchedule={plan.weeklySchedule} />

        <Card
          variant="bordered"
          className="mb-8"
        >
          <h2 className="font-semibold text-lg mb-2">Progression Strategy</h2>
          <p className="text-[var(--color-muted)] text-sm leading-relaxed">
            {plan.progression}
          </p>
        </Card>
      </div>
    </div>
  );
}
