export interface Metric {
  type: string;
}

export interface WeightSample {
  weight: number;
  value: number;
}

export interface Counting {
  /**
   * Returns the current count.
   *
   * @return the current count
   */
  getCount(): number | string;
}


/**
 * An object which maintains mean and exponentially-weighted rate.
 */
export interface Metered extends Metric, Counting {

  /**
   * Returns the number of events which have been marked.
   *
   * @return the number of events which have been marked
   */
  getCount(): number;

  /**
   * Get the accurate number per collecting interval
   * @return an long array, each contains the number of events, keyed by timestamp in milliseconds
   */
  getInstantCount(): Map<number, number>;

  /**
   * Get the accurate number per collecting interval since (including) the start time
   * @param startTime the start time of the query
   * @return an long array, each contains the number of events, keyed by timestamp in milliseconds
   */
  getInstantCount(startTime: number): Map<number, number>;

  /**
   * Get the collecting interval
   * @return the collecting interval
   */
  getInstantCountInterval(): number;

  /**
   * Returns the fifteen-minute exponentially-weighted moving average rate at which events have
   * occurred since the meter was created.
   * <p/>
   * This rate has the same exponential decay factor as the fifteen-minute load average in the
   * {@code top} Unix command.
   *
   * @return the fifteen-minute exponentially-weighted moving average rate at which events have
   *         occurred since the meter was created
   */
  getFifteenMinuteRate(): number;

  /**
   * Returns the five-minute exponentially-weighted moving average rate at which events have
   * occurred since the meter was created.
   * <p/>
   * This rate has the same exponential decay factor as the five-minute load average in the {@code
   * top} Unix command.
   *
   * @return the five-minute exponentially-weighted moving average rate at which events have
   *         occurred since the meter was created
   */
  getFiveMinuteRate(): number;

  /**
   * Returns the mean rate at which events have occurred since the meter was created.
   *
   * @return the mean rate at which events have occurred since the meter was created
   */
  getMeanRate(): number;

  /**
   * Returns the one-minute exponentially-weighted moving average rate at which events have
   * occurred since the meter was created.
   * <p/>
   * This rate has the same exponential decay factor as the one-minute load average in the {@code
   * top} Unix command.
   *
   * @return the one-minute exponentially-weighted moving average rate at which events have
   *         occurred since the meter was created
   */
  getOneMinuteRate(): number;
}

/**
 * An object which samples values.
 */
export interface Sampling {
  /**
   * Returns a snapshot of the values.
   *
   * @return a snapshot of the values
   */
  getSnapshot(): Snapshot;
}

export interface Snapshot {

  /**
   * Returns the value at the given quantile.
   *
   * @param quantile    a given quantile, in {@code [0..1]}
   * @return the value in the distribution at {@code quantile}
   */
  getValue(quantile: number);

  /**
   * Returns the entire set of values in the snapshot.
   *
   * @return the entire set of values
   */
  getValues(): number [];

  /**
   * Returns the number of values in the snapshot.
   *
   * @return the number of values
   */
  size(): number;

  /**
   * Returns the median value in the distribution.
   *
   * @return the median value
   */
  getMedian(): number;

  /**
   * Returns the value at the 75th percentile in the distribution.
   *
   * @return the value at the 75th percentile
   */
  get75thPercentile(): number;

  /**
   * Returns the value at the 95th percentile in the distribution.
   *
   * @return the value at the 95th percentile
   */
  get95thPercentile(): number;

  /**
   * Returns the value at the 98th percentile in the distribution.
   *
   * @return the value at the 98th percentile
   */
  get98thPercentile(): number;

  /**
   * Returns the value at the 99th percentile in the distribution.
   *
   * @return the value at the 99th percentile
   */
  get99thPercentile(): number;

  /**
   * Returns the value at the 99.9th percentile in the distribution.
   *
   * @return the value at the 99.9th percentile
   */
  get999thPercentile(): number;

  /**
   * Returns the highest value in the snapshot.
   *
   * @return the highest value
   */
  getMax(): number;

  /**
   * Returns the arithmetic mean of the values in the snapshot.
   *
   * @return the arithmetic mean
   */
  getMean(): number;

  /**
   * Returns the lowest value in the snapshot.
   *
   * @return the lowest value
   */
  getMin(): number;

  /**
   * Returns the standard deviation of the values in the snapshot.
   *
   * @return the standard value
   */
  getStdDev(): number;

}


export interface Long {
  /**
   * Returns the sum of this and the specified Long.
   */
  add(addend: number | Long | string): Long;

  /**
   * Returns the bitwise AND of this Long and the specified.
   */
  and(other: Long | number | string): Long;

  /**
   * Compares this Long's value with the specified's.
   */
  compare(other: Long | number | string): number;

  /**
   * Compares this Long's value with the specified's.
   */
  comp(other: Long | number | string): number;

  /**
   * Returns this Long divided by the specified.
   */
  divide(divisor: Long | number | string): Long;

  /**
   * Returns this Long divided by the specified.
   */
  div(divisor: Long | number | string): Long;

  /**
   * Tests if this Long's value equals the specified's.
   */
  equals(other: Long | number | string): boolean;

  /**
   * Tests if this Long's value equals the specified's.
   */
  eq(other: Long | number | string): boolean;

  /**
   * Gets the high 32 bits as a signed integer.
   */
  getHighBits(): number;

  /**
   * Gets the high 32 bits as an unsigned integer.
   */
  getHighBitsUnsigned(): number;

  /**
   * Gets the low 32 bits as a signed integer.
   */
  getLowBits(): number;

  /**
   * Gets the low 32 bits as an unsigned integer.
   */
  getLowBitsUnsigned(): number;

  /**
   * Gets the number of bits needed to represent the absolute value of this Long.
   */
  getNumBitsAbs(): number;

  /**
   * Tests if this Long's value is greater than the specified's.
   */
  greaterThan(other: Long | number | string): boolean;

  /**
   * Tests if this Long's value is greater than the specified's.
   */
  gt(other: Long | number | string): boolean;

  /**
   * Tests if this Long's value is greater than or equal the specified's.
   */
  greaterThanOrEqual(other: Long | number | string): boolean;

  /**
   * Tests if this Long's value is greater than or equal the specified's.
   */
  gte(other: Long | number | string): boolean;

  /**
   * Tests if this Long's value is greater than or equal the specified's.
   */
  ge(other: Long | number | string): boolean;

  /**
   * Tests if this Long's value is even.
   */
  isEven(): boolean;

  /**
   * Tests if this Long's value is negative.
   */
  isNegative(): boolean;

  /**
   * Tests if this Long's value is odd.
   */
  isOdd(): boolean;

  /**
   * Tests if this Long's value is positive.
   */
  isPositive(): boolean;

  /**
   * Tests if this Long's value equals zero.
   */
  isZero(): boolean;

  /**
   * Tests if this Long's value equals zero.
   */
  eqz(): boolean;

  /**
   * Tests if this Long's value is less than the specified's.
   */
  lessThan(other: Long | number | string): boolean;

  /**
   * Tests if this Long's value is less than the specified's.
   */
  lt(other: Long | number | string): boolean;

  /**
   * Tests if this Long's value is less than or equal the specified's.
   */
  lessThanOrEqual(other: Long | number | string): boolean;

  /**
   * Tests if this Long's value is less than or equal the specified's.
   */
  lte(other: Long | number | string): boolean;

  /**
   * Tests if this Long's value is less than or equal the specified's.
   */
  le(other: Long | number | string): boolean;

  /**
   * Returns this Long modulo the specified.
   */
  modulo(other: Long | number | string): Long;

  /**
   * Returns this Long modulo the specified.
   */
  mod(other: Long | number | string): Long;

  /**
   * Returns this Long modulo the specified.
   */
  rem(other: Long | number | string): Long;

  /**
   * Returns the product of this and the specified Long.
   */
  multiply(multiplier: Long | number | string): Long;

  /**
   * Returns the product of this and the specified Long.
   */
  mul(multiplier: Long | number | string): Long;

  /**
   * Negates this Long's value.
   */
  negate(): Long;

  /**
   * Negates this Long's value.
   */
  neg(): Long;

  /**
   * Returns the bitwise NOT of this Long.
   */
  not(): Long;

  /**
   * Tests if this Long's value differs from the specified's.
   */
  notEquals(other: Long | number | string): boolean;

  /**
   * Tests if this Long's value differs from the specified's.
   */
  neq(other: Long | number | string): boolean;

  /**
   * Tests if this Long's value differs from the specified's.
   */
  ne(other: Long | number | string): boolean;

  /**
   * Returns the bitwise OR of this Long and the specified.
   */
  or(other: Long | number | string): Long;

  /**
   * Returns this Long with bits shifted to the left by the given amount.
   */
  shiftLeft(numBits: number | Long): Long;

  /**
   * Returns this Long with bits shifted to the left by the given amount.
   */
  shl(numBits: number | Long): Long;

  /**
   * Returns this Long with bits arithmetically shifted to the right by the given amount.
   */
  shiftRight(numBits: number | Long): Long;

  /**
   * Returns this Long with bits arithmetically shifted to the right by the given amount.
   */
  shr(numBits: number | Long): Long;

  /**
   * Returns this Long with bits logically shifted to the right by the given amount.
   */
  shiftRightUnsigned(numBits: number | Long): Long;

  /**
   * Returns this Long with bits logically shifted to the right by the given amount.
   */
  shru(numBits: number | Long): Long;

  /**
   * Returns this Long with bits logically shifted to the right by the given amount.
   */
  shr_u(numBits: number | Long): Long;

  /**
   * Returns the difference of this and the specified Long.
   */
  subtract(subtrahend: number | Long | string): Long;

  /**
   * Returns the difference of this and the specified Long.
   */
  sub(subtrahend: number | Long |string): Long;

  /**
   * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
   */
  toInt(): number;

  /**
   * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
   */
  toNumber(): number;

  /**
   * Converts this Long to its byte representation.
   */

  toBytes(le?: boolean): number[];

  /**
   * Converts this Long to its little endian byte representation.
   */

  toBytesLE(): number[];

  /**
   * Converts this Long to its big endian byte representation.
   */

  toBytesBE(): number[];

  /**
   * Converts this Long to signed.
   */
  toSigned(): Long;

  /**
   * Converts the Long to a string written in the specified radix.
   */
  toString(radix?: number): string;

  /**
   * Converts this Long to unsigned.
   */
  toUnsigned(): Long;

  /**
   * Returns the bitwise XOR of this Long and the given one.
   */
  xor(other: Long | number | string): Long;
}

