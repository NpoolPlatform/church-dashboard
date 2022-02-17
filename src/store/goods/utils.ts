import { ExpandGood, Good } from './types'

const expandGoodToGood = (good: ExpandGood): Good => {
  const supportedCoinIDs = [] as Array<string>
  good.SupportCoins?.forEach((coin) => {
    supportedCoinIDs.push(coin.ID as string)
  })
  const feeIDs = [] as Array<string>
  good.Good.Fees.forEach((fee) => {
    feeIDs.push(fee.ID as string)
  })

  return {
    ID: good.Good.Good.ID,
    DeviceInfoID: good.Good.DeviceInfo.ID,
    SeparateFee: good.Good.Good.SeparateFee,
    UnitPower: good.Good.Good.UnitPower,
    DurationDays: good.Good.Good.DurationDays,
    CoinInfoID: good.Main?.ID,
    Actuals: good.Good.Good.Actuals,
    DeliveryAt: good.Good.Good.DeliveryAt,
    InheritFromGoodID: good.Good.Good.InheritFromGoodID,
    VendorLocationID: good.Good.VendorLocation.ID,
    Price: good.Good.Good.Price,
    BenefitType: good.Good.Good.BenefitType,
    Classic: good.Good.Good.Classic,
    SupportCoinTypeIDs: supportedCoinIDs,
    Title: good.Good.Good.Title,
    Total: good.Good.Good.Total,
    Unit: good.Good.Good.Unit,
    FeeIDs: feeIDs,
    PriceCurrency: good.Good.PriceCurrency.ID
  } as Good
}

export {
  expandGoodToGood
}
