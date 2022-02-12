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
    ID: good.Good.ID,
    DeviceInfoID: good.Good.DeviceInfo.ID,
    SeparateFee: good.Good.SeparateFee,
    UnitPower: good.Good.UnitPower,
    DurationDays: good.Good.DurationDays,
    CoinInfoID: good.Main?.ID,
    Actuals: good.Good.Actuals,
    DeliveryAt: good.Good.DeliveryAt,
    InheritFromGoodID: good.Good.InheritFromGoodID,
    VendorLocationID: good.Good.VendorLocation.ID,
    Price: good.Good.Price,
    BenefitType: good.Good.BenefitType,
    Classic: good.Good.Classic,
    SupportCoinTypeIDs: supportedCoinIDs,
    Title: good.Good.Title,
    Total: good.Good.Total,
    Unit: good.Good.Unit,
    FeeIDs: feeIDs,
    PriceCurrency: good.Good.PriceCurrency.ID
  } as Good
}

export {
  expandGoodToGood
}
