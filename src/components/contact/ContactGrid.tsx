"use client";

import { useState } from "react";
import {
  Button,
  Column,
  Heading,
  Icon,
  Input,
  RevealFx,
  Row,
  Text,
  Textarea,
} from "@once-ui-system/core";
import { useLocale } from "@/context/LocaleContext";
import styles from "./ContactGrid.module.scss";

const CONTACT_EMAIL = "kgdev@biuro.net";
const GITHUB_URL = "https://github.com/1choc";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

export function ContactGrid() {
  const { locale, ui, href } = useLocale();
  const { contact } = ui;

  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = contact.errors.required;
    if (!form.email.trim()) {
      next.email = contact.errors.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = contact.errors.email;
    }
    if (!form.message.trim()) next.message = contact.errors.required;
    return next;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });

      if (!response.ok) {
        throw new Error("submit_failed");
      }

      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setErrors({ message: contact.errors.generic });
    } finally {
      setSubmitting(false);
    }
  };

  type ContactCard =
    | {
        id: string;
        icon: string;
        title: string;
        description: string;
        href: string;
        external: boolean;
        badge?: false;
      }
    | {
        id: string;
        icon: string;
        title: string;
        description: string;
        badge: true;
      };

  const cards: ContactCard[] = [
    {
      id: "email",
      icon: "email",
      title: contact.email.title,
      description: contact.email.description,
      href: `mailto:${CONTACT_EMAIL}`,
      external: false,
    },
    {
      id: "quote",
      icon: "document",
      title: contact.quote.title,
      description: contact.quote.description,
      href: href("/quote"),
      external: false,
    },
    {
      id: "github",
      icon: "github",
      title: contact.github.title,
      description: contact.github.description,
      href: GITHUB_URL,
      external: true,
    },
    {
      id: "availability",
      icon: "checkCircle",
      title: contact.availability.title,
      description: contact.availability.badge,
      badge: true,
    },
  ];

  return (
    <Column fillWidth gap="32" horizontal="center" align="center" className={styles.root}>
      <Column fillWidth gap="12" horizontal="center" align="center" className={styles.hero}>
        <Heading variant="display-strong-s" wrap="balance">
          {contact.pageTitle}
        </Heading>
        <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
          {contact.pageDescription}
        </Text>
      </Column>

      <div className={styles.grid}>
        {cards.map((card, index) => (
          <RevealFx key={card.id} translateY="12" delay={0.05 * index} fillWidth>
            {"badge" in card && card.badge ? (
              <Column gap="16" className={styles.card} fillHeight data-cursor="card">
                <div className={styles.iconWrap}>
                  <Icon name={card.icon} size="l" onBackground="brand-strong" />
                </div>
                <Column gap="8">
                  <Heading as="h3" variant="heading-strong-m">
                    {card.title}
                  </Heading>
                  <Row gap="8" vertical="center" horizontal="center" className={styles.badgeRow}>
                    <span className={styles.statusDot} aria-hidden="true" />
                    <Text variant="body-default-s" onBackground="neutral-strong">
                      {card.description}
                    </Text>
                  </Row>
                </Column>
              </Column>
            ) : (
              <a
                href={card.href}
                className={styles.cardLink}
                {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                data-cursor="card"
              >
                <Column gap="16" className={styles.card} fillHeight>
                  <div className={styles.iconWrap}>
                    <Icon name={card.icon} size="l" onBackground="brand-strong" />
                  </div>
                  <Column gap="8">
                    <Heading as="h3" variant="heading-strong-m">
                      {card.title}
                    </Heading>
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      {card.description}
                    </Text>
                    {card.id === "email" && (
                      <Text variant="label-default-s" onBackground="brand-strong">
                        {CONTACT_EMAIL}
                      </Text>
                    )}
                  </Column>
                </Column>
              </a>
            )}
          </RevealFx>
        ))}
      </div>

      <RevealFx translateY="12" delay={0.25} fillWidth>
        <Column gap="20" className={`${styles.formInner} ${styles.formCell}`}>
          <Column gap="8" horizontal="center" align="center">
            <Heading as="h2" variant="heading-strong-l">
              {contact.quickMessage.title}
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak" wrap="balance">
              {contact.quickMessage.description}
            </Text>
          </Column>

          {submitted ? (
            <Column gap="8" horizontal="center" align="center" className={styles.success}>
              <Icon name="checkCircle" size="m" onBackground="brand-strong" />
              <Heading as="h3" variant="heading-strong-s">
                {contact.quickMessage.successTitle}
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak" wrap="balance">
                {contact.quickMessage.successDescription}
              </Text>
              <Button variant="tertiary" size="s" onClick={() => setSubmitted(false)}>
                {contact.quickMessage.sendAnother}
              </Button>
            </Column>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formFields}>
                <Input
                  id="contact-name"
                  label={contact.quickMessage.name}
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
                  id="contact-email"
                  type="email"
                  label={contact.quickMessage.email}
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
              </div>
              <Column gap="8">
                <Text variant="label-strong-s">{contact.quickMessage.message}</Text>
                <Textarea
                  id="contact-message"
                  lines={6}
                  placeholder={contact.quickMessage.messagePlaceholder}
                value={form.message}
                onChange={(event) => {
                  setForm((prev) => ({ ...prev, message: event.target.value }));
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next.message;
                    return next;
                  });
                }}
                  error={Boolean(errors.message)}
                  errorMessage={errors.message}
                />
              </Column>
              <Row horizontal="center">
                <Button type="submit" variant="primary" size="m" disabled={submitting}>
                  {submitting ? contact.quickMessage.submitting : contact.quickMessage.submit}
                </Button>
              </Row>
            </form>
          )}
        </Column>
      </RevealFx>
    </Column>
  );
}
