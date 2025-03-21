export const enLexicon = {
    title: "Lexicon",
    predictedTime: {
        title: 'Predicted time',
        text: 'Time to which the prediction refers, i.e. at which the predicted value should occur. For example: On 24/02/2025 at 12:00 it should be 12°C. In this case, "24/12/2025 at 12 noon" is the predicted time.'
    },
    timeOfPrediction: {
        title: 'Time of the prediction',
        text: 'Time at which the prediction was "published/created". For example, a prediction for 24/02/2025 is created on 12/02/2025. "12/02/2025" is the time of the prediction and "24/05/2025" is the [predicted time](#predictedTime).'
           },
    benchmarkingIdea: {
        title: 'Numeric Benchmarks for Weathermodels',
        text: `
Weather models are complex systems that attempt to predict the future development of the atmosphere. Numerical benchmarks can be used to assess the quality of these predictions. These benchmarks compare the models' predictions with actual observations and rank the models based on their accuracy. 

### What are numerical benchmarks?

Numerical benchmarks are quantitative assessments that measure the performance of weather models against real observational data. They provide an objective basis for comparing different models and determining which model provides the best forecasts in certain situations or over a certain period of time.

### Methodology in the background

The basic idea behind numerical benchmarks is simple: 

1. collect forecasts: The forecasts of different weather models for a specific time and location are collected.
2. collect observations: Real weather observations (e.g. temperature, wind speed) for the same time and location are obtained from reliable sources such as weather stations or satellites.
3. comparison and evaluation: The predictions of the models are compared with the actual observations. Statistical metrics such as the mean square error (MSE) or the negative log-likelihood (NLL) are used to assess how well the predictions match the observations.
4. create a ranking list: The models are ranked based on their evaluation results. The model with the lowest MSE or the highest NLL is considered the most accurate. The values can be categorised into different time spans in order to make statements with a higher information content: (some models may perform better for long-term forecasts but are less good for short-term forecasts)

- Short-term forecasts (up to 24 hours)
- Medium-term forecasts (24-72 hours)
- Long-term forecasts (over 72 hours)

###  Extension of benchmarks

In the simplest version, benchmarks can be calculated and saved using a handful of variables for different time periods with one metric. To make the benchmarks more precise and meaningful, 1 more variables can be used, which may be weighted differently. In addition, the forecasts in the different time periods can be weighted according to their distance from the predicted point in time. Many other measures can be taken to make the assessment of the forecasts as precise and meaningful as possible.

### Interpretation of results

The practical application of the benchmark system is carried out via script sequences that enable an automated daily comparison of model performance. These can be viewed via the web interface. The benchmark scores can also be used, for example, to weight the statements of individual models based on their average historical benchmark scores when merging models.
`    }, 
        metaForecasting: {
            title: "Meta Forecasting",
            text: `
In addition to the possibility of making concrete weather forecasts, i.e. predicting concrete values for weather characteristics, there is also the possibility of making forecasts for meta-information. Examples of such meta-forecasts are predictions about the confidence of a forecast.

### How can confidence be predicted?

Confidence describes how certain a model is when making a prediction. Neural networks can be used to learn patterns from past predictions and associated observations of how confident models have been in the past when making predictions under certain conditions. This can also be used to determine which of these conditions are crucial for the reliability of weather forecasts.

### Methodology behind confidence forecasts

Collecting historical predictions: In order to train models, predictions must be collected so that they can later be compared with the corresponding observations.

Record observations: To compare historical prediction data with actual values, observations must also be recorded.

Estimate means and standard deviations: Based on the historical predictions and the observations, an attempt is made to learn the prediction of a mean and a standard deviation. In our case, training is done using the maximum likelihood method, where the parameters of the model are adjusted to maximise the probability of the observed data under the estimated normal distribution.

### Possibility of extending meta-forecasts

Meta-forecasts offer a wide range of extension possibilities to improve the quality and usefulness of weather forecasts. One obvious extension is the integration of meta-forecasts for model fusion, where several models are combined to increase forecast accuracy and stability. In addition, feature dependencies can be taken into account and incorporated into the forecasts. Furthermore, the effects of inputs on the outputs of the meta-forecasts can be analysed to better understand what factors influence the confidence of the forecasts.


### Interpreting the results

Interpretation of meta-forecast results requires a thorough understanding of the underlying models and data. Confidence values should not be considered in isolation, but in the context of the model's historical performance and the specific weather conditions. A high confidence value means that the model is confident that the forecast is accurate based on past data, while a low value indicates uncertainty. It is important to identify and account for sources of error, such as incomplete or erroneous data, modelling assumptions or external influences. In addition, trends and patterns in confidence levels over time should be analysed to identify systematic errors or potential for improvement. Finally, the results of meta-forecasts should always be considered in conjunction with other weather data and models to ensure a comprehensive and reliable weather forecast.
`
        }
}