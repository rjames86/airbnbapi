declare module 'airbnbapijs' {
    /** YYYY-MM-DD */
    export type DATE_SHORT = string
    /** YYYY-MM-DDTHH:MM:SSZ */
    export type DATE_LONG = string
    export type AirApiClient = typeof AirApi
    export interface Config {
        api_key?: string
        token?: string
        currency?: string
        default_headers?: {
            'Content-Type': string
            'User-Agent': string
        }
        domain?: string
        proxy?: any
    }

    interface Guest {
        created_at: DATE_LONG
        first_name: string
        id: number
        email: string
        last_name: string
        review_count_as_guest: number
        verifications: Array<string>
    }

    interface Reservation {
        guest: Guest
        check_in: DATE_SHORT
        check_out: DATE_SHORT
        confirmation_code: string
        id: number
        status: string
        thread_id: number
    }

    interface User {
        id: number
        first_name: string
        picture_url: string
        thumbnail_url: string
        has_profile_pic: boolean
    }

    interface UserObject {
        user: User
    }

    export interface ThreadPost {
        id: number
        user_id: number
        created_at: DATE_LONG
        checkin_date: DATE_SHORT
        checkout_date: DATE_SHORT
        number_of_guests: number
        message: string
        has_check_in_guide: boolean
        sent_from_mobile: boolean
        status?: string
    }

    export interface MessageThread {
        id: number
        updated_at: DATE_LONG
        preview_user_id: number
        preview: string
        unread: boolean
        responded: boolean
        status: string
        status_string: string
        inquiry_checkin_date: DATE_SHORT
        inquiry_checkout_date: DATE_SHORT
        inquiry_number_of_guests: number
        posts: Array<ThreadPost>
        users: Array<UserObject>
    }

    type Token = string
    interface RequestToken {
        token: Token
    }

    interface RequestWithID extends RequestToken {
        id: number
    }

    interface ReservationsWithRequest extends RequestToken {
        offset?: number
        limit?: number
    }

    export interface CalendarRequest extends RequestWithID {
        startDate: DATE_SHORT
        endDate: DATE_SHORT
    }

    export type CalendarType = 'reservation' | 'rule' | 'available' | 'busy'

    interface CalendarResponseBase {
        type: CalendarType
        available: boolean
        subtype: string | null
        subtype_or_reservation_status: string | null
        date: DATE_SHORT
        notes: string | null
    }

    interface CalendarReservation {
        id: number
        base_price_host_native: number
        confirmation_code: string
        end_date: DATE_SHORT
        formatted_host_base_price: string
        guest: CalendarReservationGuest
        guest_avatar_status: string
        guest_details: Array<any>
        guest_checkin_at: DATE_SHORT | null
        is_group_payment_enabled: boolean
        host_currency: string
        host_payout_formatted: string
        localized_payout_price: number
        hosting_id: number
        payout_price_in_host_currency: number
        nights: number
        number_of_guests: number
        replace_guest_profile_photo_with_initial: boolean
        start_date: DATE_SHORT
        status: string
        status_string: string
        thread_id: number
    }

    interface CalendarReservationGuest {
        first_name: string
        full_name: string
        id: number
        location: string
        picture_url: string
        thumbnail_url: string
    }

    export interface CalendarReservationResponseBusy extends CalendarResponseBase {
        type: 'busy'
        subtype: 'host_busy'
        subtype_or_reservation_status: 'host_busy'
    }

    export interface CalendarReservationResponseTurnover extends CalendarResponseBase {
        type: 'rule'
        subtype: 'turnover_days'
        subtype_or_reservation_status: 'turnover_days'
    }

    export interface CalendarReservationResponseAvailable extends CalendarResponseBase {
        type: 'available'
        subtype: null
    }

    export interface CalendarReservationResponse extends CalendarResponseBase {
        type: 'reservation'
        available: boolean
        date: DATE_SHORT
        closed_to_arrival: false
        group_id: string
        host_busy: boolean
        listing_id: number
        min_nights: number
        notes: string | null
        price: object
        reason: string | null
        reservation: CalendarReservation
        subtype_or_reservation_status: string
    }

    export type CalendarResponse = CalendarResponseBase
    export type AllCalendarResponse =
        | CalendarReservationResponse
        | CalendarReservationResponseAvailable
        | CalendarReservationResponseTurnover
        | CalendarReservationResponseBusy

    export interface ThreadsBatchRequest extends RequestToken {
        ids: Array<number>
    }

    export interface BatchThread {
        thread: {
            id: number
            unified_message_thread_url: string
        }
    }
    export type ThreadsBatchResponse = Array<BatchThread>

    export class AirApiClass {
        config: Config
        alterationRequestResponse: Function
        buildOptions: Function

        setConfig(config: Config): void

        createThread: Function
        getCalendar(data: CalendarRequest): Array<AllCalendarResponse>
        getGuestInfo: Function
        getHostSummary: Function
        getListingInfo: Function
        getListingInfoHost: Function
        getOwnActiveListings: Function
        getOwnUserInfo: Function
        getPublicListingCalendar: Function
        getReservation(data: RequestWithID): Reservation
        getReservations(data: ReservationsWithRequest): Array<Reservation>
        getReservationsBatch: Function
        getThread(data: RequestWithID): MessageThread
        getThreadFull: Function
        getThreads: Function
        getThreadsBatch(data: ThreadsBatchRequest): Promise<ThreadsBatchResponse>
        getThreadsFull: Function
        listingSearch: Function
        login: Function
        mGetOwnActiveListingsFull: Function
        newAccessToken: Function
        newAccount: Function
        sendMessage: Function
        sendPreApproval: Function
        sendReview: Function
        sendSpecialOffer: Function
        setApiKey: Function
        setAvailabilityForDay: Function
        setCurrency: Function
        setDefaultToken: Function
        setHouseManual: Function
        setPriceForDay: Function
        setProxy: Function
        setUserAgent: Function
        testAuth(token: Token): boolean
    }

    const AirApi: AirApiClass
    export default AirApi
}
