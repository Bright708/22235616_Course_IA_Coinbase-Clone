import { upsellCardDefaultWidth } from "@coinbase/cds-common/tokens/card";
import { Button } from "@coinbase/cds-web/buttons";
import { Card, CardBody, CardFooter } from "@coinbase/cds-web/cards";
import { Icon } from "@coinbase/cds-web/icons";
import { Text } from "@coinbase/cds-web/typography";

export const RecurringBuyCard = () => {
  return (
    <Card width={upsellCardDefaultWidth}>
      <CardBody
        description="Buy Bitcoin automatically every week"
        media={<Text font="title1">$50</Text>}
        paddingX={2}
        title="Recurring Buys"
      />
      <CardFooter paddingX={2}>
        <Button
          compact
          end={<Icon color="fg" name="caretRight" size="s" />}
          variant="secondary"
        >
          Set up now
        </Button>
      </CardFooter>
    </Card>
  );
};
