namespace TrainServer.Entities
{
    public class RoutesDB
    {
        public static List<TrainRoute> routes = new() {
            new TrainRoute("Paraíso", "Cartago", 10),
            new TrainRoute("Cartago", "Paraíso", 10),
            new TrainRoute("Cartago", "Tres Rios", 15),
            new TrainRoute("Tres Rios", "Cartago", 15),
            new TrainRoute("Tres Rios", "Curridabat", 20),
            new TrainRoute("Curridabat", "Tres Rios", 20),
            new TrainRoute("Curridabat", "San Pedro", 25),
            new TrainRoute("San Pedro", "Curridabat", 25),
            new TrainRoute("San Pedro", "Guadalupe", 5),
            new TrainRoute("Guadalupe", "San Pedro", 5),
            new TrainRoute("San Pedro", "San José", 10),
            new TrainRoute("San José", "San Pedro", 10),
            new TrainRoute("Tres Rios", "Sabanilla", 8),
            new TrainRoute("Sabanilla", "Guadalupe", 6),
            new TrainRoute("Sabanilla", "San Pedro", 7),
            new TrainRoute("Sabanilla", "San José", 12),
            new TrainRoute("Tres Rios", "Zapote", 14),
            new TrainRoute("Zapote", "Tres Rios", 14),
            new TrainRoute("Zapote", "San José", 6),
            new TrainRoute("San José", "Zapote", 6),
            new TrainRoute("Tibás", "San José", 5),
            new TrainRoute("San José", "Tibás", 5),
            new TrainRoute("Tibás", "Santo Domingo", 4),
            new TrainRoute("Santo Domingo", "Tibás", 4),
            new TrainRoute("Santo Domingo", "Heredia", 7),
            new TrainRoute("Heredia", "Santo Domingo", 7),
            new TrainRoute("Moravia", "Tibás", 5),
            new TrainRoute("Moravia", "Guadalupe", 6),
            new TrainRoute("Guadalupe", "Moravia", 6),
            new TrainRoute("Moravia", "San Vicente", 7),
        };
    }
}
