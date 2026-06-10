"use client";

import { useMemo, useState } from "react";
import {
  Button,
  Checkbox,
  Column,
  Feedback,
  Heading,
  Input,
  ProgressBar,
  Row,
  Select,
  Text,
  Textarea,
  ToggleButton,
  useToast,
} from "@once-ui-system/core";
import { useLocale } from "@/context/LocaleContext";
import styles from "./OfferBuilder.module.scss";

const TOTAL_STEPS = 6;

type FormState = {
  projectTypes: string[];
  features: string[];
  designStyle: string;
  integrations: string[];
  budget: string;
  timeline: string;
  vision: string;
  name: string;
  email: string;
  phone: string;
  company: string;
};

const initialState: FormState = {
  projectTypes: [],
  features: [],
  designStyle: "",
  integrations: [],
  budget: "",
  timeline: "",
  vision: "",
  name: "",
  email: "",
  phone: "",
  company: "",
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function resolveLabel(items: Array<{ id: string; label: string }>, id: string) {
  return items.find((item) => item.id === id)?.label ?? id;
}

export function OfferBuilder() {
  const { locale, ui, href } = useLocale();
  const { offerBuilder } = ui;
  const { addToast } = useToast();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const progress = (step / TOTAL_STEPS) * 100;

  const toggleList = (field: "projectTypes" | "features" | "integrations", id: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(id)
        ? prev[field].filter((item) => item !== id)
        : [...prev[field], id],
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validateStep = (currentStep: number) => {
    const next: Record<string, string> = {};

    if (currentStep === 1 && form.projectTypes.length === 0) {
      next.projectTypes = offerBuilder.errors.projectType;
    }
    if (currentStep === 3 && !form.designStyle) {
      next.designStyle = offerBuilder.errors.required;
    }
    if (currentStep === 5) {
      if (!form.budget) next.budget = offerBuilder.errors.required;
      if (!form.timeline) next.timeline = offerBuilder.errors.required;
      if (!form.vision.trim()) next.vision = offerBuilder.errors.required;
    }
    if (currentStep === 6) {
      if (!form.name.trim()) next.name = offerBuilder.errors.required;
      if (!form.email.trim()) next.email = offerBuilder.errors.required;
      else if (!isValidEmail(form.email)) next.email = offerBuilder.errors.email;
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const goPrev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateStep(6)) return;

    setSubmitting(true);

    try {
      const response = await fetch("/api/offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          projectTypes: form.projectTypes,
          features: form.features,
          designStyle: form.designStyle,
          integrations: form.integrations,
          budget: form.budget,
          timeline: form.timeline,
          vision: form.vision,
          contact: {
            name: form.name,
            email: form.email,
            phone: form.phone || undefined,
            company: form.company || undefined,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || offerBuilder.errors.generic);
      }

      setSubmitted(true);
      setForm(initialState);
      setStep(1);
      addToast({ variant: "success", message: offerBuilder.success.title });
    } catch (error) {
      addToast({
        variant: "danger",
        message: error instanceof Error ? error.message : offerBuilder.errors.generic,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const summaryItems = useMemo(
    () => [
      {
        label: offerBuilder.sections.projectType,
        value:
          form.projectTypes.length > 0
            ? form.projectTypes
                .map((id) => resolveLabel(offerBuilder.projectTypes, id))
                .join(", ")
            : "—",
      },
      {
        label: offerBuilder.sections.features,
        value:
          form.features.length > 0
            ? form.features.map((id) => resolveLabel(offerBuilder.features, id)).join(", ")
            : "—",
      },
      {
        label: offerBuilder.sections.design,
        value: form.designStyle
          ? resolveLabel(offerBuilder.designStyles, form.designStyle)
          : "—",
      },
      {
        label: offerBuilder.sections.integrations,
        value:
          form.integrations.length > 0
            ? form.integrations
                .map((id) => resolveLabel(offerBuilder.integrations, id))
                .join(", ")
            : "—",
      },
      {
        label: offerBuilder.sections.budget,
        value: form.budget ? resolveLabel(offerBuilder.budgets, form.budget) : "—",
      },
      {
        label: offerBuilder.sections.timeline,
        value: form.timeline ? resolveLabel(offerBuilder.timelines, form.timeline) : "—",
      },
    ],
    [form, offerBuilder],
  );

  if (submitted) {
    return (
      <Column fillWidth gap="16" id="offer-builder">
        <Feedback
          variant="success"
          title={offerBuilder.success.title}
          description={offerBuilder.success.description}
        />
        <Row gap="12" wrap>
          <Button variant="secondary" size="m" onClick={() => setSubmitted(false)}>
            {offerBuilder.submitAnother}
          </Button>
          <Button href={href("/")} variant="tertiary" size="m">
            {offerBuilder.backHome}
          </Button>
        </Row>
      </Column>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Column gap="12" className={styles.section}>
            <Heading as="h3" variant="heading-strong-s">
              {offerBuilder.steps[0]}
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {offerBuilder.stepHints.projectType}
            </Text>
            <div className={styles.chipGrid}>
              {offerBuilder.projectTypes.map((item) => (
                <ToggleButton
                  key={item.id}
                  selected={form.projectTypes.includes(item.id)}
                  onClick={() => toggleList("projectTypes", item.id)}
                >
                  {item.label}
                </ToggleButton>
              ))}
            </div>
            {errors.projectTypes && (
              <Text variant="body-default-s" onBackground="danger-weak">
                {errors.projectTypes}
              </Text>
            )}
          </Column>
        );
      case 2:
        return (
          <Column gap="12" className={styles.section}>
            <Heading as="h3" variant="heading-strong-s">
              {offerBuilder.steps[1]}
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {offerBuilder.stepHints.features}
            </Text>
            <div className={styles.featureGrid}>
              {offerBuilder.features.map((item) => (
                <Checkbox
                  key={item.id}
                  label={item.label}
                  isChecked={form.features.includes(item.id)}
                  onToggle={() => toggleList("features", item.id)}
                />
              ))}
            </div>
          </Column>
        );
      case 3:
        return (
          <Column gap="12" className={styles.section}>
            <Heading as="h3" variant="heading-strong-s">
              {offerBuilder.steps[2]}
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {offerBuilder.stepHints.design}
            </Text>
            <div className={styles.styleGrid}>
              {offerBuilder.designStyles.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.styleCard} ${form.designStyle === item.id ? styles.styleCardActive : ""}`}
                  onClick={() => {
                    setForm((prev) => ({ ...prev, designStyle: item.id }));
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.designStyle;
                      return next;
                    });
                  }}
                >
                  <Text variant="label-strong-s">{item.label}</Text>
                  <Text variant="body-default-xs" onBackground="neutral-weak">
                    {item.description}
                  </Text>
                </button>
              ))}
            </div>
            {errors.designStyle && (
              <Text variant="body-default-s" onBackground="danger-weak">
                {errors.designStyle}
              </Text>
            )}
          </Column>
        );
      case 4:
        return (
          <Column gap="12" className={styles.section}>
            <Heading as="h3" variant="heading-strong-s">
              {offerBuilder.steps[3]}
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {offerBuilder.stepHints.integrations}
            </Text>
            <div className={styles.featureGrid}>
              {offerBuilder.integrations.map((item) => (
                <Checkbox
                  key={item.id}
                  label={item.label}
                  isChecked={form.integrations.includes(item.id)}
                  onToggle={() => toggleList("integrations", item.id)}
                />
              ))}
            </div>
          </Column>
        );
      case 5:
        return (
          <Column gap="16" className={styles.section}>
            <Heading as="h3" variant="heading-strong-s">
              {offerBuilder.steps[4]}
            </Heading>
            <Row gap="16" wrap fillWidth s={{ direction: "column" }}>
              <Column flex={1} gap="8" fillWidth minWidth={16}>
                <Text variant="label-strong-s">{offerBuilder.sections.budget}</Text>
                <Select
                  id="offer-budget"
                  placeholder={offerBuilder.placeholders.select}
                  options={offerBuilder.budgets.map((item) => ({
                    value: item.id,
                    label: item.label,
                  }))}
                  value={form.budget}
                  onSelect={(value) => {
                    setForm((prev) => ({ ...prev, budget: String(value) }));
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.budget;
                      return next;
                    });
                  }}
                  fillWidth
                />
                {errors.budget && (
                  <Text variant="body-default-s" onBackground="danger-weak">
                    {errors.budget}
                  </Text>
                )}
              </Column>
              <Column flex={1} gap="8" fillWidth minWidth={16}>
                <Text variant="label-strong-s">{offerBuilder.sections.timeline}</Text>
                <Select
                  id="offer-timeline"
                  placeholder={offerBuilder.placeholders.select}
                  options={offerBuilder.timelines.map((item) => ({
                    value: item.id,
                    label: item.label,
                  }))}
                  value={form.timeline}
                  onSelect={(value) => {
                    setForm((prev) => ({ ...prev, timeline: String(value) }));
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.timeline;
                      return next;
                    });
                  }}
                  fillWidth
                />
                {errors.timeline && (
                  <Text variant="body-default-s" onBackground="danger-weak">
                    {errors.timeline}
                  </Text>
                )}
              </Column>
            </Row>
            <Column gap="8">
              <Text variant="label-strong-s">{offerBuilder.sections.vision}</Text>
              <Textarea
                id="offer-vision"
                lines={5}
                placeholder={offerBuilder.fields.visionPlaceholder}
                value={form.vision}
                onChange={(event) => {
                  setForm((prev) => ({ ...prev, vision: event.target.value }));
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next.vision;
                    return next;
                  });
                }}
                error={Boolean(errors.vision)}
                errorMessage={errors.vision}
              />
            </Column>
          </Column>
        );
      case 6:
        return (
          <Column gap="16" className={styles.section}>
            <Heading as="h3" variant="heading-strong-s">
              {offerBuilder.steps[5]}
            </Heading>
            <div className={styles.contactGrid}>
              <Input
                id="offer-name"
                label={offerBuilder.fields.name}
                value={form.name}
                onChange={(event) => {
                  setForm((prev) => ({ ...prev, name: event.target.value }));
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next.name;
                    return next;
                  });
                }}
                errorMessage={errors.name}
                required
              />
              <Input
                id="offer-email"
                type="email"
                label={offerBuilder.fields.email}
                value={form.email}
                onChange={(event) => {
                  setForm((prev) => ({ ...prev, email: event.target.value }));
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next.email;
                    return next;
                  });
                }}
                errorMessage={errors.email}
                required
              />
              <Input
                id="offer-phone"
                type="tel"
                label={offerBuilder.fields.phone}
                value={form.phone}
                onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
              />
              <Input
                id="offer-company"
                label={offerBuilder.fields.company}
                value={form.company}
                onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
              />
            </div>
          </Column>
        );
      default:
        return null;
    }
  };

  return (
    <Column fillWidth gap="24" id="offer-builder" className={styles.wizard}>
      <Column fillWidth gap="8">
        <Heading as="h1" variant="display-strong-xs" wrap="balance">
          {offerBuilder.title}
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-weak" wrap="balance">
          {offerBuilder.subline}
        </Text>
      </Column>

      <Column gap="8" fillWidth>
        <Row fillWidth horizontal="between" vertical="center">
          <Text variant="label-default-s" onBackground="neutral-weak">
            {offerBuilder.stepLabel.replace("{current}", String(step)).replace("{total}", String(TOTAL_STEPS))}
          </Text>
          <Text variant="label-default-s" onBackground="brand-medium">
            {offerBuilder.steps[step - 1]}
          </Text>
        </Row>
        <ProgressBar value={progress} max={100} />
      </Column>

      <div className={styles.layout}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Column gap="24">
            {renderStep()}
            <Row gap="12" horizontal="between" fillWidth wrap>
              <Button
                type="button"
                variant="secondary"
                size="m"
                onClick={goPrev}
                disabled={step === 1}
              >
                {offerBuilder.prev}
              </Button>
              {step < TOTAL_STEPS ? (
                <Button type="button" variant="primary" size="m" onClick={goNext} arrowIcon>
                  {offerBuilder.next}
                </Button>
              ) : (
                <Button type="submit" variant="primary" size="m" disabled={submitting} arrowIcon>
                  {submitting ? offerBuilder.submitting : offerBuilder.submit}
                </Button>
              )}
            </Row>
          </Column>
        </form>

        <aside className={styles.sidebar}>
          <Column gap="16" className={styles.sidebarInner}>
            <Heading as="h3" variant="heading-strong-s">
              {offerBuilder.summary.title}
            </Heading>
            <div className={styles.sidebarScroll}>
              {summaryItems.map((item) => (
                <Column key={item.label} gap="4">
                  <Text variant="label-default-xs" onBackground="neutral-weak">
                    {item.label}
                  </Text>
                  <Text variant="body-default-s">{item.value}</Text>
                </Column>
              ))}
            </div>
          </Column>
        </aside>
      </div>
    </Column>
  );
}
