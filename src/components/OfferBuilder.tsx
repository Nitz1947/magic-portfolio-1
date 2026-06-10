"use client";

import { useState } from "react";
import {
  Button,
  Checkbox,
  Column,
  Feedback,
  Heading,
  Input,
  Row,
  Select,
  Text,
  Textarea,
  ToggleButton,
  useToast,
} from "@once-ui-system/core";
import { useLocale } from "@/context/LocaleContext";
import { SectionBackground } from "@/components/effects";
import styles from "./OfferBuilder.module.scss";

type FormState = {
  projectTypes: string[];
  features: string[];
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

export function OfferBuilder() {
  const { locale, ui } = useLocale();
  const { offerBuilder } = ui;
  const { addToast } = useToast();

  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleProjectType = (id: string) => {
    setForm((prev) => ({
      ...prev,
      projectTypes: prev.projectTypes.includes(id)
        ? prev.projectTypes.filter((item) => item !== id)
        : [...prev.projectTypes, id],
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.projectTypes;
      return next;
    });
  };

  const toggleFeature = (id: string) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(id)
        ? prev.features.filter((item) => item !== id)
        : [...prev.features, id],
    }));
  };

  const validate = () => {
    const next: Record<string, string> = {};

    if (form.projectTypes.length === 0) {
      next.projectTypes = offerBuilder.errors.projectType;
    }
    if (!form.budget) {
      next.budget = offerBuilder.errors.required;
    }
    if (!form.timeline) {
      next.timeline = offerBuilder.errors.required;
    }
    if (!form.vision.trim()) {
      next.vision = offerBuilder.errors.required;
    }
    if (!form.name.trim()) {
      next.name = offerBuilder.errors.required;
    }
    if (!form.email.trim()) {
      next.email = offerBuilder.errors.required;
    } else if (!isValidEmail(form.email)) {
      next.email = offerBuilder.errors.email;
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      const response = await fetch("/api/offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          ...form,
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
      addToast({
        variant: "success",
        message: offerBuilder.success.title,
      });
    } catch (error) {
      addToast({
        variant: "danger",
        message: error instanceof Error ? error.message : offerBuilder.errors.generic,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <SectionBackground variant="grid">
        <Column fillWidth gap="16" id="offer-builder">
          <Feedback variant="success" title={offerBuilder.success.title} description={offerBuilder.success.description} />
          <Button variant="secondary" size="m" onClick={() => setSubmitted(false)}>
            {offerBuilder.submitAnother}
          </Button>
        </Column>
      </SectionBackground>
    );
  }

  return (
    <SectionBackground variant="grid">
      <Column fillWidth gap="24" id="offer-builder">
      <Column fillWidth gap="8">
        <Heading as="h2" variant="display-strong-xs" wrap="balance">
          {offerBuilder.title}
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-weak" wrap="balance">
          {offerBuilder.subline}
        </Text>
      </Column>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Column gap="24">
          <Column gap="12" className={styles.section}>
            <Heading as="h3" variant="heading-strong-s">
              {offerBuilder.sections.projectType}
            </Heading>
            <div className={styles.chipGrid}>
              {offerBuilder.projectTypes.map((item) => (
                <ToggleButton
                  key={item.id}
                  selected={form.projectTypes.includes(item.id)}
                  onClick={() => toggleProjectType(item.id)}
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

          <Column gap="12" className={styles.section}>
            <Heading as="h3" variant="heading-strong-s">
              {offerBuilder.sections.features}
            </Heading>
            <div className={styles.featureGrid}>
              {offerBuilder.features.map((item) => (
                <Checkbox
                  key={item.id}
                  label={item.label}
                  isChecked={form.features.includes(item.id)}
                  onToggle={() => toggleFeature(item.id)}
                />
              ))}
            </div>
          </Column>

          <Row gap="16" wrap className={styles.section} fillWidth s={{ direction: "column" }}>
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

          <Column gap="8" className={styles.section}>
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

          <Column gap="16" className={styles.section}>
            <Heading as="h3" variant="heading-strong-s">
              {offerBuilder.sections.contact}
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

          <Row horizontal="end">
            <Button type="submit" variant="primary" size="m" disabled={submitting} arrowIcon>
              {submitting ? offerBuilder.submitting : offerBuilder.submit}
            </Button>
          </Row>
        </Column>
      </form>
    </Column>
    </SectionBackground>
  );
}
