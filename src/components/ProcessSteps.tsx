import { Column, Heading, Row, Text } from "@once-ui-system/core";
import styles from "./ProcessSteps.module.scss";

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

interface ProcessStepsProps {
  title: string;
  steps: ProcessStep[];
}

export function ProcessSteps({ title, steps }: ProcessStepsProps) {
  return (
    <Column fillWidth gap="l" paddingX="l">
      <Heading as="h2" variant="display-strong-xs" wrap="balance">
        {title}
      </Heading>
      <Row fillWidth gap="l" wrap className={styles.grid}>
        {steps.map((step) => (
          <Column key={step.number} flex={1} minWidth={20} gap="8" className={styles.step}>
            <Text variant="display-strong-xs" onBackground="brand-medium" className={styles.number}>
              <span className={styles.numberPulse}>{step.number}</span>
            </Text>
            <Heading as="h3" variant="heading-strong-m">
              {step.title}
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {step.description}
            </Text>
          </Column>
        ))}
      </Row>
    </Column>
  );
}
