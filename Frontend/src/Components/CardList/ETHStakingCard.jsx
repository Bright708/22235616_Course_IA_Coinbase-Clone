import { upsellCardDefaultWidth } from "@coinbase/cds-common/tokens/card";
import { Button } from "@coinbase/cds-web/buttons";
import { Card, CardBody, CardFooter } from "@coinbase/cds-web/cards";
import { Icon } from "@coinbase/cds-web/icons";
import { Text } from "@coinbase/cds-web/typography";

export const ETHStakingCard = () => {
  return (
    <Card width={upsellCardDefaultWidth}>
      <CardBody
        description="Earn up to 3.2% APY on your ETH"
        media={<Text font="title1">3.2%</Text>}
        paddingX={2}
        title="ETH Staking"
      />
      <CardFooter paddingX={2}>
        <Button
          compact
          end={<Icon color="fg" name="caretRight" size="s" />}
          variant="secondary"
        >
          Learn more
        </Button>
      </CardFooter>
    </Card>
  );
};
