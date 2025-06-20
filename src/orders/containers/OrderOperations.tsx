import React from "react";

import { getMutationProviderData } from "../../misc";
import { PartialMutationProviderOutput } from "../../types";
import {
  TypedAssignOrderMutation,
  TypedOrderAddNoteMutation,
  TypedOrderCancelMutation,
  TypedOrderCaptureMutation,
  TypedOrderCreateFulfillmentMutation,
  TypedOrderDraftCancelMutation,
  TypedOrderDraftFinalizeMutation,
  TypedOrderDraftUpdateMutation,
  TypedOrderFulfillmentCancelMutation,
  TypedOrderFulfillmentUpdateTrackingMutation,
  TypedOrderLineDeleteMutation,
  TypedOrderLinesAddMutation,
  TypedOrderLineUpdateMutation,
  TypedOrderMarkAsPaidMutation,
  TypedOrderRefundMutation,
  TypedOrderShippingMethodUpdateMutation,
  TypedOrderUpdateMutation,
  TypedOrderVoidMutation
} from "../mutations";
import { AssignOrder, AssignOrderVariables } from "../types/AssignOrder";
import { OrderAddNote, OrderAddNoteVariables } from "../types/OrderAddNote";
import { OrderCancel, OrderCancelVariables } from "../types/OrderCancel";
import { OrderCapture, OrderCaptureVariables } from "../types/OrderCapture";
import {
  OrderCreateFulfillment,
  OrderCreateFulfillmentVariables
} from "../types/OrderCreateFulfillment";
import {
  OrderDraftCancel,
  OrderDraftCancelVariables
} from "../types/OrderDraftCancel";
import {
  OrderDraftFinalize,
  OrderDraftFinalizeVariables
} from "../types/OrderDraftFinalize";
import {
  OrderDraftUpdate,
  OrderDraftUpdateVariables
} from "../types/OrderDraftUpdate";
import {
  OrderFulfillmentCancel,
  OrderFulfillmentCancelVariables
} from "../types/OrderFulfillmentCancel";
import {
  OrderFulfillmentUpdateTracking,
  OrderFulfillmentUpdateTrackingVariables
} from "../types/OrderFulfillmentUpdateTracking";
import {
  OrderLineDelete,
  OrderLineDeleteVariables
} from "../types/OrderLineDelete";
import { OrderLinesAdd, OrderLinesAddVariables } from "../types/OrderLinesAdd";
import {
  OrderLineUpdate,
  OrderLineUpdateVariables
} from "../types/OrderLineUpdate";
import {
  OrderMarkAsPaid,
  OrderMarkAsPaidVariables
} from "../types/OrderMarkAsPaid";
import { OrderRefund, OrderRefundVariables } from "../types/OrderRefund";
import {
  OrderShippingMethodUpdate,
  OrderShippingMethodUpdateVariables
} from "../types/OrderShippingMethodUpdate";
import { OrderUpdate, OrderUpdateVariables } from "../types/OrderUpdate";
import { OrderVoid, OrderVoidVariables } from "../types/OrderVoid";

interface OrderOperationsProps {
  order: string;
  children: (props: {
    orderAddNote: PartialMutationProviderOutput<
      OrderAddNote,
      OrderAddNoteVariables
    >;
    OrderAssignRider: PartialMutationProviderOutput<
      AssignOrder,
      AssignOrderVariables
    >; 
    orderCancel: PartialMutationProviderOutput<
      OrderCancel,
      OrderCancelVariables
    >;
    orderCreateFulfillment: PartialMutationProviderOutput<
      OrderCreateFulfillment,
      OrderCreateFulfillmentVariables
    >;
    orderFulfillmentCancel: PartialMutationProviderOutput<
      OrderFulfillmentCancel,
      OrderFulfillmentCancelVariables
    >;
    orderFulfillmentUpdateTracking: PartialMutationProviderOutput<
      OrderFulfillmentUpdateTracking,
      OrderFulfillmentUpdateTrackingVariables
    >;
    orderPaymentCapture: PartialMutationProviderOutput<
      OrderCapture,
      OrderCaptureVariables
    >;
    orderPaymentRefund: PartialMutationProviderOutput<
      OrderRefund,
      OrderRefundVariables
    >;
    orderPaymentMarkAsPaid: PartialMutationProviderOutput<
      OrderMarkAsPaid,
      OrderMarkAsPaidVariables
    >;
    orderVoid: PartialMutationProviderOutput<OrderVoid, OrderVoidVariables>;
    orderUpdate: PartialMutationProviderOutput<
      OrderUpdate,
      OrderUpdateVariables
    >;
    orderDraftCancel: PartialMutationProviderOutput<
      OrderDraftCancel,
      OrderDraftCancelVariables
    >;
    orderDraftFinalize: PartialMutationProviderOutput<
      OrderDraftFinalize,
      OrderDraftFinalizeVariables
    >;
    orderDraftUpdate: PartialMutationProviderOutput<
      OrderDraftUpdate,
      OrderDraftUpdateVariables
    >;
    orderShippingMethodUpdate: PartialMutationProviderOutput<
      OrderShippingMethodUpdate,
      OrderShippingMethodUpdateVariables
    >;
    orderLineDelete: PartialMutationProviderOutput<
      OrderLineDelete,
      OrderLineDeleteVariables
    >;
    orderLinesAdd: PartialMutationProviderOutput<
      OrderLinesAdd,
      OrderLinesAddVariables
    >;
    orderLineUpdate: PartialMutationProviderOutput<
      OrderLineUpdate,
      OrderLineUpdateVariables
    >;
  }) => React.ReactNode;
  onOrderFulfillmentCancel: (data: OrderFulfillmentCancel) => void;
  onOrderFulfillmentCreate: (data: OrderCreateFulfillment) => void;
  onOrderFulfillmentUpdate: (data: OrderFulfillmentUpdateTracking) => void;
  onOrderCancel: (data: OrderCancel) => void;
  onOrderVoid: (data: OrderVoid) => void;
  onOrderMarkAsPaid: (data: OrderMarkAsPaid) => void;
  onNoteAdd: (data: OrderAddNote) => void;
  onAssignOrder: (data: AssignOrder) => void;
  onPaymentCapture: (data: OrderCapture) => void;
  onPaymentRefund: (data: OrderRefund) => void;
  onUpdate: (data: OrderUpdate) => void;
  onDraftCancel: (data: OrderDraftCancel) => void;
  onDraftFinalize: (data: OrderDraftFinalize) => void;
  onDraftUpdate: (data: OrderDraftUpdate) => void;
  onShippingMethodUpdate: (data: OrderShippingMethodUpdate) => void;
  onOrderLineDelete: (data: OrderLineDelete) => void;
  onOrderLinesAdd: (data: OrderLinesAdd) => void;
  onOrderLineUpdate: (data: OrderLineUpdate) => void;
}

const OrderOperations: React.StatelessComponent<OrderOperationsProps> = ({
  children,
  onDraftUpdate,
  onOrderFulfillmentCreate,
  onNoteAdd,
  onAssignOrder,
  onOrderCancel,
  onOrderLinesAdd,
  onOrderLineDelete,
  onOrderLineUpdate,
  onOrderVoid,
  onPaymentCapture,
  onPaymentRefund,
  onShippingMethodUpdate,
  onUpdate,
  onDraftCancel,
  onDraftFinalize,
  onOrderFulfillmentCancel,
  onOrderFulfillmentUpdate,
  onOrderMarkAsPaid
}) => (
  <TypedOrderVoidMutation onCompleted={onOrderVoid}>
    {(...orderVoid) => (
      <TypedOrderCancelMutation onCompleted={onOrderCancel}>
        {(...orderCancel) => (
          <TypedOrderCaptureMutation onCompleted={onPaymentCapture}>
            {(...paymentCapture) => (
              <TypedOrderRefundMutation onCompleted={onPaymentRefund}>
                {(...paymentRefund) => (
                  <TypedOrderCreateFulfillmentMutation
                    onCompleted={onOrderFulfillmentCreate}
                  >
                    {(...createFulfillment) => (
                      <TypedOrderAddNoteMutation onCompleted={onNoteAdd}>
                        {(...addNote) => (
                        <TypedAssignOrderMutation onCompleted={onAssignOrder}>
                          {(...assignOrder) => (
                          <TypedOrderUpdateMutation onCompleted={onUpdate}>
                            {(...update) => (
                              <TypedOrderDraftUpdateMutation
                                onCompleted={onDraftUpdate}
                              >
                                {(...updateDraft) => (
                                  <TypedOrderShippingMethodUpdateMutation
                                    onCompleted={onShippingMethodUpdate}
                                  >
                                    {(...updateShippingMethod) => (
                                      <TypedOrderLineDeleteMutation
                                        onCompleted={onOrderLineDelete}
                                      >
                                        {(...deleteOrderLine) => (
                                          <TypedOrderLinesAddMutation
                                            onCompleted={onOrderLinesAdd}
                                          >
                                            {(...addOrderLine) => (
                                              <TypedOrderLineUpdateMutation
                                                onCompleted={onOrderLineUpdate}
                                              >
                                                {(...updateOrderLine) => (
                                                  <TypedOrderFulfillmentCancelMutation
                                                    onCompleted={
                                                      onOrderFulfillmentCancel
                                                    }
                                                  >
                                                    {(...cancelFulfillment) => (
                                                      <TypedOrderFulfillmentUpdateTrackingMutation
                                                        onCompleted={
                                                          onOrderFulfillmentUpdate
                                                        }
                                                      >
                                                        {(
                                                          ...updateTrackingNumber
                                                        ) => (
                                                          <TypedOrderDraftFinalizeMutation
                                                            onCompleted={
                                                              onDraftFinalize
                                                            }
                                                          >
                                                            {(
                                                              ...finalizeDraft
                                                            ) => (
                                                              <TypedOrderDraftCancelMutation
                                                                onCompleted={
                                                                  onDraftCancel
                                                                }
                                                              >
                                                                {(
                                                                  ...cancelDraft
                                                                ) => (
                                                                  <TypedOrderMarkAsPaidMutation
                                                                    onCompleted={
                                                                      onOrderMarkAsPaid
                                                                    }
                                                                  >
                                                                    {(
                                                                      ...markAsPaid
                                                                    ) =>
                                                                      children({
                                                                        OrderAssignRider: getMutationProviderData(
                                                                          ...assignOrder
                                                                        ),
                                                                        orderAddNote: getMutationProviderData(
                                                                          ...addNote
                                                                        ),
                                                                        orderCancel: getMutationProviderData(
                                                                          ...orderCancel
                                                                        ),
                                                                        orderCreateFulfillment: getMutationProviderData(
                                                                          ...createFulfillment
                                                                        ),
                                                                        orderDraftCancel: getMutationProviderData(
                                                                          ...cancelDraft
                                                                        ),
                                                                        orderDraftFinalize: getMutationProviderData(
                                                                          ...finalizeDraft
                                                                        ),
                                                                        orderDraftUpdate: getMutationProviderData(
                                                                          ...updateDraft
                                                                        ),
                                                                        orderFulfillmentCancel: getMutationProviderData(
                                                                          ...cancelFulfillment
                                                                        ),
                                                                        orderFulfillmentUpdateTracking: getMutationProviderData(
                                                                          ...updateTrackingNumber
                                                                        ),
                                                                        orderLineDelete: getMutationProviderData(
                                                                          ...deleteOrderLine
                                                                        ),
                                                                        orderLineUpdate: getMutationProviderData(
                                                                          ...updateOrderLine
                                                                        ),
                                                                        orderLinesAdd: getMutationProviderData(
                                                                          ...addOrderLine
                                                                        ),
                                                                        orderPaymentCapture: getMutationProviderData(
                                                                          ...paymentCapture
                                                                        ),
                                                                        orderPaymentMarkAsPaid: getMutationProviderData(
                                                                          ...markAsPaid
                                                                        ),
                                                                        orderPaymentRefund: getMutationProviderData(
                                                                          ...paymentRefund
                                                                        ),
                                                                        orderShippingMethodUpdate: getMutationProviderData(
                                                                          ...updateShippingMethod
                                                                        ),
                                                                        orderUpdate: getMutationProviderData(
                                                                          ...update
                                                                        ),
                                                                        orderVoid: getMutationProviderData(
                                                                          ...orderVoid
                                                                        )
                                                                      })
                                                                    }
                                                                  </TypedOrderMarkAsPaidMutation>
                                                                )}
                                                              </TypedOrderDraftCancelMutation>
                                                            )}
                                                          </TypedOrderDraftFinalizeMutation>
                                                        )}
                                                      </TypedOrderFulfillmentUpdateTrackingMutation>
                                                    )}
                                                  </TypedOrderFulfillmentCancelMutation>
                                                )}
                                              </TypedOrderLineUpdateMutation>
                                            )}
                                          </TypedOrderLinesAddMutation>
                                        )}
                                      </TypedOrderLineDeleteMutation>
                                    )}
                                  </TypedOrderShippingMethodUpdateMutation>
                                )}
                              </TypedOrderDraftUpdateMutation>
                            )}
                          </TypedOrderUpdateMutation>
                        )}
                        </TypedAssignOrderMutation>
                        )}
                      </TypedOrderAddNoteMutation>
                    )}
                  </TypedOrderCreateFulfillmentMutation>
                )}
              </TypedOrderRefundMutation>
            )}
          </TypedOrderCaptureMutation>
        )}
      </TypedOrderCancelMutation>
    )}
  </TypedOrderVoidMutation>
);
export default OrderOperations;
