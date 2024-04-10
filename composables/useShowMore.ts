import type { IDataProduct, IDataUser } from '~/types/types'
interface IBaseShowMoreProps {
  id: number
  dataSelected: IDataProduct | IDataUser | undefined
  openInfo: boolean
}

export const useShowMoreInfo = <T extends IDataProduct | IDataUser>(
  tipo: string
) => {
  interface InterfaceSelected extends IBaseShowMoreProps {
    data: T[]
  }

  const viewShowMore = ({
    id,
    data,
    dataSelected,
    openInfo
  }: InterfaceSelected) => {
    // Ahora "data" tendrá el tipo especificado por T
    dataSelected = data?.find((el) => el.id === id) as IDataProduct | IDataUser
    if (dataSelected) {
      openInfo = true
    }
    return {
      openInfoS: openInfo,
      dataSelectedS: dataSelected
    }
  }

  return {
    viewShowMore
  }
}
