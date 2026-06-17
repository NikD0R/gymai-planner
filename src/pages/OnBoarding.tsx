import { RedirectToSignIn, SignedIn } from "@neondatabase/neon-js/auth/react";
import { useAuth } from "../context/AuthContext";
import {
  goalOptions,
  experienceOptions,
  daysOptions,
  sessionOptions,
  equipmentOptions,
  splitOptions,
} from "../dal/options";
import { Card } from "../components/ui/Card";
import { Select } from "../components/ui/Select";
import { useState } from "react";
import { Textarea } from "../components/ui/Textarea";
import { Button } from "../components/ui/Button";
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import type { UserProfile } from "../types";
import { useNavigate } from "react-router-dom";

export default function OnBoarding() {
  const { user, saveProfile, generatePlan, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    goal: "bulk",
    experience: "intermediate",
    daysPerWeek: "4",
    sessionLength: "60",
    equipment: "full_gym",
    injuries: "",
    preferredSplit: "upper_lower",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[var(--color-accent)] mx-auto mb-6 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <RedirectToSignIn />;
  }

  function updateForm(field: string, value: string) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleQuestionnaire(e: React.SubmitEvent) {
    e.preventDefault();

    const profile: Omit<UserProfile, "userId" | "updatedAt"> = {
      goal: formData.goal as UserProfile["goal"],
      experience: formData.experience as UserProfile["experience"],
      daysPerWeek: parseInt(formData.daysPerWeek),
      sessionLength: parseInt(formData.sessionLength),
      equipment: formData.equipment as UserProfile["equipment"],
      injuries: formData.injuries || undefined,
      preferredSplit: formData.preferredSplit as UserProfile["preferredSplit"],
    };
    try {
      await saveProfile(profile);
      setIsGenerating(true);
      await generatePlan();
      navigate("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save profile");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <SignedIn>
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-xl mx-auto">
          {/* Progress Indicator*/}
          {/* Step 1: Questionnaire*/}
          {!isGenerating ? (
            <Card variant="bordered">
              <h1 className="text-2xl font-bold mb-2">Tell us about you</h1>
              <p className="text-[var(--color-muted)] mb-6">
                Help us create the perfect plan for you.
              </p>
              {error && (
                <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200 text-sm text-red-600 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
              <form
                onSubmit={handleQuestionnaire}
                className="space-y-5"
              >
                <Select
                  id="goal"
                  label="What's your primary goal?"
                  options={goalOptions}
                  value={formData.goal}
                  onChange={(e) => updateForm("goal", e.target.value)}
                />

                <Select
                  id="experience"
                  label="Training experience"
                  options={experienceOptions}
                  value={formData.experience}
                  onChange={(e) => updateForm("experience", e.target.value)}
                />
                <div className="grid grid-cols-2 gap-4 max-[500px]:grid-cols-1">
                  <Select
                    id="daysPerWeek"
                    label="Days per week"
                    options={daysOptions}
                    value={formData.daysPerWeek}
                    onChange={(e) => updateForm("daysPerWeek", e.target.value)}
                  />
                  <Select
                    id="sessionLength"
                    label="Session length"
                    options={sessionOptions}
                    value={formData.sessionLength}
                    onChange={(e) =>
                      updateForm("sessionLength", e.target.value)
                    }
                  />
                </div>
                <Select
                  id="equipment"
                  label="Equipment access"
                  options={equipmentOptions}
                  value={formData.equipment}
                  onChange={(e) => updateForm("equipment", e.target.value)}
                />

                <Select
                  id="preferredSplit"
                  label="Preferred training split"
                  options={splitOptions}
                  value={formData.preferredSplit}
                  onChange={(e) => updateForm("preferredSplit", e.target.value)}
                />

                <Textarea
                  id="injuries"
                  label="Any injuries or limitations? (optional)"
                  placeholder="E.g., lower back issues, shoulder impingement..."
                  rows={3}
                  value={formData.injuries}
                  onChange={(e) => updateForm("injuries", e.target.value)}
                />
                <div className="flx gap-3 pt-2">
                  <Button
                    type="submit"
                    className="flex-1 gap-2 max-[360px]:text-sm"
                  >
                    Generate My Plan <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </Card>
          ) : (
            <Card
              variant="bordered"
              className="text-center py-16"
            >
              <Loader2 className="w-12 h-12 text-[var(--color-accent)] mx-auto mb-6 animate-spin" />
              <h1 className="text-2xl font-bold mb-2">Creating your Plan</h1>
              <p className="text-[var(--color-muted)]">
                {" "}
                Our AI is building your personalized training program...
              </p>
            </Card>
          )}
        </div>
      </div>
    </SignedIn>
  );
}
